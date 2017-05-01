package orderservice;

import com.sun.scenario.effect.impl.prism.ps.PPSBlend_REDPeer;
import org.apache.tomcat.jdbc.pool.DataSource;
import org.apache.tomcat.jdbc.pool.PoolProperties;
import org.json.JSONArray;
import org.json.JSONObject;
import org.restlet.Request;
import org.restlet.data.Status;
import org.restlet.ext.json.JsonRepresentation;
import org.restlet.resource.Get;
import org.restlet.resource.Post;
import org.restlet.resource.Put;
import org.restlet.resource.ServerResource;

import java.sql.*;

public class SubmitOrder extends ServerResource {

    private PoolProperties pool;
    private JSONObject orderConfirmation;
    private String username;

    public SubmitOrder() {

        pool = new PoolProperties();
        pool.setUrl("jdbc:mysql://localhost:3306/text_direct");
        pool.setDriverClassName("com.mysql.jdbc.Driver");
        pool.setUsername("root");
        pool.setPassword("Imei9f2u!");
        pool.setJmxEnabled(true);
        pool.setTestWhileIdle(false);
        pool.setTestOnBorrow(true);
        pool.setValidationQuery("SELECT 1");
        pool.setTestOnReturn(false);
        pool.setValidationInterval(30000);
        pool.setTimeBetweenEvictionRunsMillis(30000);
        pool.setMaxActive(1000);
        pool.setInitialSize(10);
        pool.setMaxWait(10000);
        pool.setRemoveAbandonedTimeout(60);
        pool.setMinEvictableIdleTimeMillis(30000);
        pool.setMinIdle(10);
        pool.setLogAbandoned(true);
        pool.setRemoveAbandoned(true);
        pool.setJdbcInterceptors(
                "org.apache.tomcat.jdbc.pool.interceptor.ConnectionState;"+
                        "org.apache.tomcat.jdbc.pool.interceptor.StatementFinalizer");

        this.orderConfirmation = new JSONObject();
        this.username = null;
        
    }
    
    @SuppressWarnings("unused")
    @Post
    public JsonRepresentation submitOrder(JsonRepresentation orderData) {

        JSONObject _orderData = orderData.getJsonObject().getJSONObject("order");
        JSONObject response = new JSONObject();
        this.username = _orderData.getJSONObject("username").toString();

        DataSource datasource = new DataSource();
        datasource.setPoolProperties(this.pool);
        PreparedStatement prepSt = null;
        String out = null;
        ResultSet rs;
        Connection con = null;
        Statement st = null;

        /* Execute query and check row quantity */
        try {

            con = datasource.getConnection();
            con.setTransactionIsolation(Connection.TRANSACTION_READ_COMMITTED);
            prepSt = con.prepareStatement("INSERT INTO `pending_order` "
                    + "(orderId, quantity, title, secTitle, authors, editors, edition, isbn, condition,"
                    + "shipmentDate, description, merchant, itemAccepted, acceptanceDate, actualShipDate,"
                    + "trackingNum, publicationDate, publisher, msrp)"
                    + "VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

            prepSt.setString(1, _orderData.getString("orderId"));
                prepSt.setString(2, _orderData.getString("quantity")); prepSt.setString(3, _orderData.getString("title"));
                    prepSt.setString(4, _orderData.getString("secTitle")); prepSt.setString(5, _orderData.getString("authors"));
                    prepSt.setString(6, _orderData.getString("editors")); prepSt.setString(7, _orderData.getString("edition"));
                    prepSt.setString(8, _orderData.getString("isbn")); prepSt.setString(9, _orderData.getString("condition"));
                    prepSt.setString(10, _orderData.getString("shipmentDate")); prepSt.setString(11, _orderData.getString("description")); prepSt.setString(12, _orderData.getString("merchant"));
                    prepSt.setString(13, _orderData.getString("itemAccepted")); prepSt.setString(14,_orderData.getString("acceptanceDate"));
                    prepSt.setString(15, _orderData.getString("actualShipDate")); prepSt.setString(16, _orderData.getString("trackingNum"));
                    prepSt.setString(17, _orderData.getString("publicationDate")); prepSt.setString(18, _orderData.getString("publisher"));
                    prepSt.setString(19,_orderData.getString("msrp"));

            prepSt.execute();
            rs = prepSt.getResultSet();

            if (!rs.next()) {
                response.put("confirmation", rs.toString());
            }

        } catch (SQLException e) {
            e.printStackTrace();
            setStatus(Status.SERVER_ERROR_INTERNAL);
            return new JsonRepresentation(new JSONObject("Response: There was an internal error; your order could not be placed."));
        }


            setStatus(Status.SUCCESS_OK);
            return new JsonRepresentation(response);
    }

}