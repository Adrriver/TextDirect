package searchservice;

import org.apache.tomcat.jdbc.pool.DataSource;
import org.apache.tomcat.jdbc.pool.PoolProperties;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.XML;
import org.restlet.Request;
import org.restlet.data.MediaType;
import org.restlet.data.Status;
import org.restlet.ext.json.JsonRepresentation;
import org.restlet.representation.Representation;

import org.restlet.resource.Get;
import org.restlet.resource.ServerResource;
import sun.awt.image.ImageWatched;

import java.sql.*;
import java.util.*;

public class AllItemSearch extends ServerResource {

        private PoolProperties p;
        private JSONObject tuple;
        private JSONArray tuples;


    public AllItemSearch() {

         this.tuple = new JSONObject();
         this.tuples = new JSONArray();

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
        p.setMaxActive(100);
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

    }

    @Get
    @SuppressWarnings("unused")
    public JsonRepresentation search() {

        String isbnData = this.getRequestAttributes().get("isbn").toString().split("[=]")[1];
        String titleQuery = null;
        try {
            titleQuery = Request.getCurrent().getResourceRef().getQueryAsForm().getFirstValue("query").toString();
        } catch( NullPointerException e ) {
            e.printStackTrace();
        }
        DataSource datasource = new DataSource();
        datasource.setPoolProperties(p);
        Connection con = null;

        List rows = new LinkedList<List<String>>();

        try {
            con = datasource.getConnection();
            Statement st = con.createStatement();
            ResultSet rs = st.executeQuery(
                    String.format("SELECT * FROM sale_item WHERE MATCH(title) AGAINST('%s' IN NATURAL LANGUAGE MODE)", titleQuery));

            ResultSetMetaData meta = rs.getMetaData();
            int columnCount = rs.getMetaData().getColumnCount();

            while(rs.next()) {

                List row = new LinkedList<String[]>();
                for(int c = 1; c <= columnCount; c++) {
                       row.add(0, new String[]{String.valueOf(c), rs.getString(c)});
                }

                rows.add(row);

            }
            // TODO: add LinkedList rows to JSONArray
            rs.close();
            st.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            if (con!=null) try {con.close();}catch (Exception ignore) {}
        }


        rows.forEach( (row) -> { ((List<String[]>)row).forEach( (key) -> this.tuple.put(key[0], key[1]));
                                    this.tuples.put(this.tuple); });

        setStatus(Status.SUCCESS_OK);
        return new JsonRepresentation(this.tuples);


    }

}
