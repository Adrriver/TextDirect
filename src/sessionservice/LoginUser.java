package sessionservice;


import jdk.nashorn.internal.scripts.JO;
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
import java.util.*;


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
    @SuppressWarnings("unused")
    public JsonRepresentation login() throws SQLException {

        JSONObject validPaymentInfo = new JSONObject();
        JSONObject accountInfo = new JSONObject();
        JSONObject shippingInfo = new JSONObject();
        JSONObject activityInfo = new JSONObject();

        try {

            this.username = this.getRequestAttributes().get("username").toString().split("=")[1];
            this.password = Request.getCurrent().getResourceRef().getQueryAsForm().getFirstValue("password");

        } catch( NullPointerException e ) {
            e.printStackTrace();
        }

        DataSource datasource = new DataSource();
        datasource.setPoolProperties(pool);
        PreparedStatement prepSt = null;

        Connection con = null;

        /* Execute query and check row quantity */
        try {

            con = datasource.getConnection();
            con.setTransactionIsolation(Connection.TRANSACTION_READ_COMMITTED);
            prepSt = con.prepareStatement("SELECT * from `account` WHERE username = ? AND password = ?");
                            prepSt.setString(1, this.username);
                            prepSt.setString(2, this.password);
            prepSt.execute();
            ResultSet rs = prepSt.getResultSet();

            if(!rs.next()) {
                setStatus(Status.CLIENT_ERROR_UNAUTHORIZED);
                return new JsonRepresentation("{ \"result\" : \"" + false + "\"}");
            } else {
                // In addition to returning rows from credential ver. query, get billing and shipping info.
                accountInfo.put("UserAccount", this.mapRowsToList(rs, false));

                prepSt = con.prepareStatement("SELECT * FROM address WHERE username = ?");
                prepSt.setString(1, this.username);
                prepSt.execute();
                rs = prepSt.getResultSet();

                if(rs.next()) shippingInfo.put("shippingAddress", this.mapRowsToList(rs, false));

                prepSt = con.prepareStatement("SELECT * FROM payment_method WHERE username = ?");
                prepSt.setString(1, this.username);
                prepSt.execute();
                rs = prepSt.getResultSet();

                System.err.println("Before payment Method has been put...");
                if(rs.next()) validPaymentInfo.put("paymentMethod", this.mapRowsToList(rs, true));
                System.err.println("After payment method has been put...");

                prepSt = con.prepareStatement("SELECT * FROM pending_order WHERE merchant = ?");
                prepSt.setString(1, this.username);
                prepSt.execute();
                rs = prepSt.getResultSet();

                if(rs.next()) activityInfo.put("UserActivity", new JSONObject().put("Sales", this.mapRowsToList(rs, false)));

                prepSt = con.prepareStatement("SELECT * FROM sale_item WHERE sellerUsername = ?");
                prepSt.setString(1, this.username);
                prepSt.execute();
                rs = prepSt.getResultSet();

                if(rs.next()) activityInfo.put("UserActivity",
                        ((JSONObject) activityInfo.get("UserActivity")).put("Items", this.mapRowsToList(rs, false)));

                prepSt = con.prepareStatement("SELECT * FROM pending_order WHERE customer = ?");
                prepSt.setString(1, this.username);
                prepSt.execute();
                rs = prepSt.getResultSet();

                if(rs.next()) activityInfo.put("UserActivity",
                        ((JSONObject) activityInfo.get("UserActivity")).put("Orders", this.mapRowsToList(rs, false)));

//                prepSt = con.prepareStatement("SELECT * FROM transaction_hist WHERE merchant = ? OR customer = ?");
//                prepSt.setString(1, this.username);
//                prepSt.setString(2, this.username);
//                prepSt.execute();
//                rs = prepSt.getResultSet();


                // if(rs.next()) accountInfo.put("UserActivity", new JSONObject().put("Transactions", this.mapRowsToList(rs, false)));



            }

            con.close();

        } catch( SQLException e ) {
            e.printStackTrace();
        } catch( NullPointerException e) {
            e.printStackTrace();
        } finally {

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

    public LinkedList<List<JSONObject>> mapRowsToList(ResultSet rs, boolean securedPaymentInfo) throws SQLException {


        List rows = new LinkedList<List<JSONObject>>();
        String nextField = null, colName = null;

        if(! securedPaymentInfo)

        try {
            ResultSetMetaData meta = rs.getMetaData();
            int columnCount = rs.getMetaData().getColumnCount();

            do {

                HashMap<String, String> row = new HashMap<>();
                for (int c = 1; c <= columnCount; c++) {

                    if((nextField = rs.getString(c)) == null) {
                        nextField = "n/a";
                    } else {
                        nextField = rs.getString(c);

                        if (rs.getString(c).equalsIgnoreCase("pmtMethod")) {
                            this.paymentMethod = paymentMethod.valueOf(rs.getString(c));

                        }
                    }

                    colName = meta.getColumnName(c);
                    row.put(colName, nextField.length() == 0 ? "0" : nextField);
                    /* Detect paymentMethod at conversion */
                }

                rows.add(new JSONObject(row));

            } while (rs.next());

        } catch (NullPointerException e) {
                System.out.println(nextField + ", " + colName);
                System.out.println(e.getCause());
                e.printStackTrace();

        } catch (SQLException e){
            e.printStackTrace();
        }

        else {
            try {
                ResultSetMetaData meta = rs.getMetaData();
                int columnCount = rs.getMetaData().getColumnCount();


                do {

                    Map row = new HashMap<String, String>();
                    for(int c = 1; c <= columnCount; c++) {

                               colName = meta.getColumnName(c);
                               nextField = rs.getString(c) == null ? "fullNameChecking" : rs.getString(c);
                            if(nextField.length() > 0) {
                                nextField = !colName.contains("fullName") ? nextField.substring(nextField.length() - 2) : nextField;
                                row.put(colName, nextField);
                            } else {
                                row.put(colName, "0");
                            }

                    }

                    rows.add(new JSONObject(row));

                } while(rs.next());

            } catch (SQLException e){
                e.printStackTrace();
            } catch (NullPointerException e){
                e.printStackTrace();
            }
        }

          return (LinkedList<List<JSONObject>>) rows;
    }

}