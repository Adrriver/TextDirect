package itemcreatorservice;

import org.apache.tomcat.jdbc.pool.DataSource;
import org.apache.tomcat.jdbc.pool.PoolProperties;
import org.restlet.resource.ServerResource;
import org.json.JSONObject;
import org.restlet.Request;
import org.restlet.data.MediaType;
import org.restlet.data.Status;
import org.restlet.ext.json.JsonRepresentation;
import org.restlet.resource.Get;
import java.sql.*;
import java.util.*;

public class RetrieveItem extends ServerResource {

    private PoolProperties p;
    private JSONObject tuple;

    public RetrieveItem(){

    this.tuple = new JSONObject();

    p = new PoolProperties();
    p.setUrl("jdbc:mysql://localhost:3306/text_direct");
    p.setDriverClassName("com.mysql.jdbc.Driver");
    p.setUsername("root");
    p.setPassword("Imei9f2u!");
    p.setJmxEnabled(true);
    p.setTestWhileIdle(false);
    p.setTestOnBorrow(true);
    p.setValidationQuery("SELECT 1");
    p.setTestOnReturn(false);
    p.setValidationInterval(30000);
    p.setTimeBetweenEvictionRunsMillis(30000);
    p.setMaxActive(1000);
    p.setInitialSize(10);
    p.setMaxWait(10000);
    p.setRemoveAbandonedTimeout(60);
    p.setMinEvictableIdleTimeMillis(30000);
    p.setMinIdle(10);
    p.setLogAbandoned(true);
    p.setRemoveAbandoned(true);
    p.setJdbcInterceptors(
            "org.apache.tomcat.jdbc.pool.interceptor.ConnectionState;"+
                    "org.apache.tomcat.jdbc.pool.interceptor.StatementFinalizer");

    this.tuple = new JSONObject();

        }

        @SuppressWarnings("unused")
        @Get
        public JsonRepresentation getItem(){

            String itemId = null;
            String nextField = null, colName = null;

            try {
                itemId = Request.getCurrent().getResourceRef().getQueryAsForm().getFirstValue("itemId").toString();
            } catch( NullPointerException e ) {
                e.printStackTrace();
            }

                    DataSource datasource = new DataSource();
                    datasource.setPoolProperties(p);
                    PreparedStatement prepSt = null;
                    Connection con = null;

            try {
                    con = datasource.getConnection();
                    Statement st = con.createStatement();
                    con.setTransactionIsolation(Connection.TRANSACTION_READ_COMMITTED);
                    prepSt = con.prepareStatement("SELECT * from `sale_item` WHERE itemId = ?");
                    prepSt.setString(1, itemId);
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

                        tuple.put("item", new JSONObject(row));
                    }
                        con.close();

            } catch (NullPointerException e) {
                System.out.println(nextField + ", " + colName);
                System.out.println(e.getCause());
                e.printStackTrace();

            } catch (SQLException e){
                e.printStackTrace();
            }

            System.out.println("tuple: " + tuple.toString());
            setStatus(Status.SUCCESS_OK);
            return new JsonRepresentation(this.tuple);

        }


    }
