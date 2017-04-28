package sessionservice;


import org.apache.tomcat.jdbc.pool.ConnectionPool;
import org.apache.tomcat.jdbc.pool.DataSource;
import org.apache.tomcat.jdbc.pool.PoolProperties;
import org.json.JSONArray;
import org.json.JSONObject;
import org.restlet.Request;
import org.restlet.data.Status;
import org.restlet.ext.json.JsonRepresentation;
import org.restlet.resource.ServerResource;
import org.restlet.resource.Get;

import java.sql.*;
import java.util.LinkedList;
import java.util.List;


public class LoginUser extends ServerResource {

    private enum PaymentMethod {

        CREDIT, DEBIT, CHECK

    }

    private String username;
    private String password;
    private JSONArray sessionPackage;
    private PaymentMethod paymentMethod;
    private PoolProperties pool;
    private  List rows; // <-- new LinkedList<List<String>>()

    public LoginUser(){

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

        this.sessionPackage = new JSONArray();

    }


    @Get
    public JsonRepresentation login() throws SQLException {

        JSONObject validPaymentInfo = new JSONObject();
        JSONObject accountInfo = new JSONObject();
        JSONObject shippingInfo = new JSONObject();
        JSONObject activityInfo = new JSONObject();

        try {

            this.username = this.getRequestAttributes().get("username").toString().split("=")[1];
            this.password = Request.getCurrent().getResourceRef().getQueryAsForm().getFirstValue("password").toString();

        } catch( NullPointerException e ) {
            e.printStackTrace();
        }

        DataSource datasource = new DataSource();
        datasource.setPoolProperties(pool);

        Connection con = null;

        /* Execute query and check row quantity */
        try {

            con = datasource.getConnection();
            Statement st = con.createStatement();
            ResultSet rs = st.executeQuery("SELECT * from account WHERE username = '"
                                                +this.username+"' AND `password` = '"+this.password+"'");
            System.out.println(rs.next());
            if(rs.getRow() == 0) {
                setStatus(Status.CLIENT_ERROR_UNAUTHORIZED);
                return new JsonRepresentation("{ \"result\" : \"" + false + "\"}");
            } else {

                // In addition to returning rows from credential ver. query, get billing and shipping info.
                accountInfo.put("UserAccount", this.mapRowsToList(rs, false));

                rs = st.executeQuery("SELECT * FROM address WHERE username = '"+this.username+"'");

                shippingInfo.put("UserAccount", this.mapRowsToList(rs, false));

                rs = st.executeQuery("SELECT * FROM payment_method WHERE username = '"+this.username+"'");

                validPaymentInfo.put("PaymentMethod", this.mapRowsToList(rs, true));

                // add 'pending_order/pending_sale', 'sale_item', 'transaction' to package
                rs = st.executeQuery("SELECT  * FROM pending_order WHERE merchant = '"+this.username+"'");

                activityInfo.put("UserActivity", new JSONObject().put("Sales", this.mapRowsToList(rs, false)));

                rs = st.executeQuery("SELECT * FROM sale_item WHERE sellerUsername = '"+this.username+"'");

                activityInfo.put("UserActivity", new JSONObject().put("UserItems", this.mapRowsToList(rs, false)));

                rs = st.executeQuery("SELECT * FROM pending_order WHERE customer = '"+this.username+"'");

                accountInfo.put("UserActivity", new JSONObject().put("Orders", this.mapRowsToList(rs, false)));

                rs = st.executeQuery("SELECT * FROM transaction_hist WHERE merchant = '"+this.username+"' OR customer = '"+this.username+"'");

                accountInfo.put("UserActivity", new JSONObject().put("Transaction", this.mapRowsToList(rs, false)));



            }

        } catch( SQLException e ) {
            e.printStackTrace();
        }

        this.sessionPackage.put(0, new JSONObject().put("username", this.username));
        this.sessionPackage.put(0, ((JSONObject) this.sessionPackage.get(0)).put("password", this.password));
        this.sessionPackage.put(1, accountInfo.put("shippingAddress", shippingInfo));
        this.sessionPackage.put(2, validPaymentInfo);
        this.sessionPackage.put(3, activityInfo);

        this.username = this.password = null;
        setStatus(Status.SUCCESS_OK);
        return new JsonRepresentation(this.sessionPackage);
    }

    public LinkedList<List<String>> mapRowsToList(ResultSet rs, boolean securedPaymentInfo) throws SQLException {


        List rows = new LinkedList<List<String>>();

        if(! securedPaymentInfo)

        try {
            ResultSetMetaData meta = rs.getMetaData();
            int columnCount = rs.getMetaData().getColumnCount();

            while(rs.next()) {

                List row = new LinkedList<String[]>();
                for(int c = 1; c <= columnCount; c++) {
                    String nextField = rs.getString(c);
                    row.add(0, new String[]{rs.getMetaData().getColumnName(c), (nextField.length() == 0 ? "0" : nextField)});
                    /* Detect paymentMethod at conversion */
                    if( rs.getString(c).equalsIgnoreCase("pmtMethod")) { this.paymentMethod = paymentMethod.valueOf(rs.getString(c)); }
                }

                    rows.add(row);

            }

        } catch (SQLException e){
            e.printStackTrace();
        }

        else {
            try {
                ResultSetMetaData meta = rs.getMetaData();
                int columnCount = rs.getMetaData().getColumnCount();

                while(rs.next()) {

                    List row = new LinkedList<String[]>();
                    for(int c = 1; c <= columnCount; c++) {

                        String colName = rs.getMetaData().getColumnName(c);
                        String nextField = rs.getString(c);
                            if(nextField.length() > 0) {
                                nextField = !colName.contains("fullName") ? nextField.substring(nextField.length() - 4) : nextField;
                                row.add(c, new String[]{colName, nextField});
                            } else {
                                row.add(c, new String[]{colName, "0"});
                            }

                    }

                    rows.add(row);

                }

            } catch (SQLException e){
                e.printStackTrace();
            }
        }
          return (LinkedList<List<String>>) rows;
    }

}