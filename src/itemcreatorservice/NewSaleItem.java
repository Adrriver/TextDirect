package itemcreatorservice;

import javafx.beans.property.adapter.JavaBeanObjectProperty;
import org.apache.tomcat.jdbc.pool.DataSource;
import org.apache.tomcat.jdbc.pool.PoolProperties;
import org.json.JSONObject;
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
    public Representation createNewItem(Representation data){

        Form form = new Form(data);

        form.get(0);

        System.err.println("form at [0]: " + form.get(0));
        JOptionPane.showMessageDialog(null, "form at [0]: " + form.get(0));
        DataSource datasource = new DataSource();
        datasource.setPoolProperties(p);
        String out = null;
        Connection con = null;
        try {
            con = datasource.getConnection();
            Statement st = con.createStatement();
            ResultSet rs = st.executeQuery("INSERT INTO sale_item\n" +
                    "VALUES('1', '1', 'Concepts of Programming Languages', '', 'Robert Sebesta', '', '11', '2015/01/01', 'Pearson', '013394302X', '167.20',\n" +
                    "       '80.50', 'GOOD', '0', '2017/11/24', 'This is a useful book! Looks almost new.', 'Arive2')");
            int cnt = 1;
            while (rs.next()) {
                out += ". Attribute One:" +rs.getString("attribute_one");
            }
            rs.close();
            st.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            if (con!=null) try {con.close();}catch (Exception ignore) {}
        }

        setStatus(Status.SUCCESS_OK);
        return new StringRepresentation("Well, this is working...", MediaType.TEXT_PLAIN);

    }



}
