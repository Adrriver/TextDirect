package itemcreatorservice;

import org.apache.tomcat.jdbc.pool.DataSource;
import org.apache.tomcat.jdbc.pool.PoolProperties;
import org.json.JSONObject;
import org.restlet.ext.json.JsonRepresentation;
import org.restlet.resource.ServerResource;
import org.restlet.resource.Post;
import org.restlet.representation.Representation;
import org.restlet.data.Status;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.NumberFormat;


public class NewSaleItem extends ServerResource {

        private static PoolProperties p;

    public NewSaleItem(){

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

    @Post
    public Representation createNewItem(JsonRepresentation data) {
        JSONObject item = ((JSONObject)data.getJsonObject().get("item"));
        
        DataSource datasource = new DataSource();
        datasource.setPoolProperties(p);
        String out = null;
        Connection con = null;
        boolean rs;

        try {
            con = datasource.getConnection();
            Statement st = con.createStatement();
            rs = st.execute(String.format("INSERT INTO sale_item (quantity, bookTitle, secondaryTitle, authors, editors, " +
                                            "edition, publicationDate, isbn, publisher, msrp, salePrice, `condition`, internationalEdition, " +
                                            "shipsOn, description, sellerUsername, pageCount) " +
                                            "VALUES('%d', '%s', '%s', '%s', '%s', '%d', " +
                                                    "'%s', '%s', '%s', '%s', '%s', '%s', '%d', '%s', '%s', '%s', '%d')",
                    Integer.valueOf(item.get("quantity").toString()), item.get("bookTitle").toString(), item.get("secondaryTitle").toString(),
                    item.get("authors").toString(), item.get("editors").toString(), Integer.parseInt(item.get("edition").toString()),
                    item.get("publicationDate").toString(), item.get("ISBN"), item.get("publisher").toString(),
                    item.get("MSRP").toString(), item.get("salePrice").toString(), item.get("condition").toString(), Integer.parseInt(item.get("internationalEdition").toString()),
                    item.get("shipsOn").toString(), item.get("description").toString(), item.get("sellerUsername").toString(), Integer.parseInt(item.get("pageCount").toString())));

            System.err.println(rs);
            st.close();

        } catch (SQLException ignore) {
                ignore.printStackTrace();
                setStatus(Status.CLIENT_ERROR_FAILED_DEPENDENCY);
                return new JsonRepresentation("I'm sorry, there was an error; please try again.");
        } finally {
            if (con != null) try {
                con.close();
            } catch (Exception ignore) {
            }
        }

        // if INSERT was successful
        if(rs) {
            setStatus(Status.SERVER_ERROR_INTERNAL);
            return new JsonRepresentation("I'm sorry, there was an error; please try again.");
        } else {
            setStatus(Status.SUCCESS_OK);
            return new JsonRepresentation("Your item was created successfully!");
        }
    }
}
