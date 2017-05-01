package currentactivity;

import org.apache.tomcat.jdbc.pool.DataSource;
import org.apache.tomcat.jdbc.pool.PoolProperties;
import org.json.JSONObject;
import org.restlet.Request;
import org.restlet.data.Status;
import org.restlet.ext.json.JsonRepresentation;
import org.restlet.resource.Get;
import org.restlet.resource.ServerResource;

import java.sql.*;
import java.util.HashMap;

/**
 * Created by Adrian on 5/1/2017.
 */
public class RetrievePendingOrder extends ServerResource {

    private JSONObject order;
    private PoolProperties pool;

    public RetrievePendingOrder() {

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

        this.order = new JSONObject();

    }

    @SuppressWarnings("unused")
    @Get
    public JsonRepresentation getOrder(){

        String orderId = null;
        String nextField = null, colName = null, username = null;

        try {
            username = Request.getCurrent().getResourceRef().getQueryAsForm().getFirstValue("username");
            orderId = Request.getCurrent().getResourceRef().getQueryAsForm().getFirstValue("orderId");
        } catch( NullPointerException e ) {
            e.printStackTrace();
        }

        DataSource datasource = new DataSource();
        datasource.setPoolProperties(pool);
        PreparedStatement prepSt = null;
        Connection con = null;

        try {
            con = datasource.getConnection();
            Statement st = con.createStatement();
            con.setTransactionIsolation(Connection.TRANSACTION_READ_COMMITTED);
            prepSt = con.prepareStatement("SELECT * from `pending_order` WHERE orderId = ? AND `customer` = ?");
            prepSt.setString(1, orderId);
            prepSt.setString(2, username);
            prepSt.execute();
            ResultSet rs = prepSt.getResultSet();

            ResultSetMetaData meta = rs.getMetaData();

            int columnCount = rs.getMetaData().getColumnCount();

            while(rs.next()) {

                HashMap<String, String> row = new HashMap<>();
                for (int col = 1; col <= columnCount; col++) {

                    if ((nextField = rs.getString(col)) == null) {
                        nextField = "n/a";
                    } else {
                        nextField = rs.getString(col);
                    }

                    colName = meta.getColumnName(col);
                    row.put(colName, nextField);
                }

                order.put("order", new JSONObject(row));
                con.close();

            }

        } catch (NullPointerException e) {
            System.out.println(nextField + ", " + colName);
            System.out.println(e.getCause());
            e.printStackTrace();

        } catch (SQLException e){
            e.printStackTrace();
        }


        System.out.println(this.order.toString(2));
        setStatus(Status.SUCCESS_OK);
        return new JsonRepresentation(this.order);


    }

}
