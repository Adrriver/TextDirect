package itemcreatorservice;

import javafx.beans.property.adapter.JavaBeanObjectProperty;
import org.apache.tomcat.jdbc.pool.DataSource;
import org.apache.tomcat.jdbc.pool.PoolProperties;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONString;
import org.restlet.data.Parameter;
import org.restlet.ext.json.JsonRepresentation;
import org.restlet.resource.Get;
import org.restlet.resource.ServerResource;

import org.restlet.resource.Post;
import org.restlet.representation.Representation;
import org.restlet.representation.StringRepresentation;
import org.restlet.data.Status;
import org.restlet.data.MediaType;
import org.restlet.data.Form;

import javax.swing.*;
import javax.ws.rs.FormParam;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Level;

import static org.glassfish.hk2.utilities.Stub.Type.VALUES;


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
        try {
            con = datasource.getConnection();
            Statement st = con.createStatement();
            boolean rs = st.execute(String.format("INSERT INTO sale_item VALUES(%d, '%s', '%s', '%s', '%s', '%s', '%s', " +
                                                    "'%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')",
                    0, item.get("quantity").toString(), item.get("bookTitle").toString(), item.get("secondaryTitle").toString(),
                    item.get("authors").toString(), item.get("editors").toString(), item.get("edition").toString(), item.get("publicationDate").toString(),
                    item.get("publisher"), item.get("ISBN").toString(), item.get("MSRP").toString(), item.get("salePrice").toString(),
                    item.get("condition").toString(), item.get("internationalEdition").toString(), item.get("shipsOn").toString(),
                    item.get("description").toString(), item.get("sellerUsername").toString(), item.get("pageCount").toString()));

            st.close();
            setStatus(Status.SUCCESS_OK);
            return new JsonRepresentation(new JSONObject().put("message", "Your item was created successfully!"));

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            if (con != null) try {
                con.close();
            } catch (Exception ignore) {
            }
        }

        this.getLogger().log(Level.INFO, data.getJsonObject().toString());
        setStatus(Status.CLIENT_ERROR_FAILED_DEPENDENCY);
        return new JsonRepresentation("I'm sorry, there was an error; please try again.");

    }
}
