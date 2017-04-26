package sessionservice;

import org.apache.tomcat.jdbc.pool.DataSource;
import org.apache.tomcat.jdbc.pool.PoolProperties;
import org.json.JSONObject;
import org.restlet.ext.json.JsonRepresentation;
import org.restlet.resource.ServerResource;
import org.restlet.resource.Post;
import org.restlet.data.Status;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;


public class CreateAccount extends ServerResource {
    
    private PoolProperties poolProperties;
    private String username;
    private String password;
    
    public CreateAccount() {

        this.poolProperties = new PoolProperties();
        this.poolProperties.setUrl("jdbc:mysql://localhost:3306/text_direct");
        this.poolProperties.setDriverClassName("com.mysql.jdbc.Driver");
        this.poolProperties.setUsername("root");
        this.poolProperties.setPassword("Imei9f2u!");
        this.poolProperties.setJmxEnabled(true);
        this.poolProperties.setTestWhileIdle(false);
        this.poolProperties.setTestOnBorrow(true);
        this.poolProperties.setValidationQuery("SELECT 1");
        this.poolProperties.setTestOnReturn(false);
        this.poolProperties.setValidationInterval(30000);
        this.poolProperties.setTimeBetweenEvictionRunsMillis(30000);
        this.poolProperties.setMaxActive(100);
        this.poolProperties.setInitialSize(10);
        this.poolProperties.setMaxWait(10000);
        this.poolProperties.setRemoveAbandonedTimeout(60);
        this.poolProperties.setMinEvictableIdleTimeMillis(30000);
        this.poolProperties.setMinIdle(10);
        this.poolProperties.setLogAbandoned(true);
        this.poolProperties.setRemoveAbandoned(true);
        this.poolProperties.setJdbcInterceptors(
                "org.apache.tomcat.jdbc.pool.interceptor.ConnectionState;"+
                        "org.apache.tomcat.jdbc.pool.interceptor.StatementFinalizer");

    }

    @Post
    public JsonRepresentation create(JsonRepresentation data) {

        DataSource datasource = new DataSource();
        datasource.setPoolProperties(this.poolProperties);
        String out = null;
        boolean rs;
        Connection con = null;
        Statement st = null;


            JSONObject registrationForm = ((JSONObject)data.getJsonArray().getJSONObject(0).get("reg")); // 'reg'
        System.err.println(registrationForm.toString());
            this.username = registrationForm.get("username").toString();
            this.password = registrationForm.get("password").toString();


        try {

            con = datasource.getConnection();
            st = con.createStatement();

    /* INSERT registration form data, excluding payment (including billing) and shipping information */
            rs = st.execute(String.format("INSERT INTO account (username, password, idVerQuestion, idVerAnswer, emailAddress, firstName, middleName, " +
                                         "lastName, telephoneNumber, registrationDate, userRating, standing, isAdmin, pmtMethod)" +
                            "VALUES('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '2017-04-25', '%d', '%d', '%d', '%s')",
                    this.username, registrationForm.get("password").toString(), registrationForm.get("idVerQuestion").toString(),
                    registrationForm.get("idVerAnswer").toString(), registrationForm.get("emailAddress").toString(),
                    registrationForm.get("firstName").toString(), registrationForm.get("middleName").toString(),
                    registrationForm.get("lastName").toString(), registrationForm.get("telephoneNumber").toString(),
                    Integer.valueOf(registrationForm.get("userRating").toString()), 1, 0, registrationForm.get("pmtMethod").toString()));
// registrationForm.get("registrationDate").toString(),
        } catch( SQLException ignore ) {

            try{
                st.close();
            } catch( SQLException e ){
                e.printStackTrace();
            }
                ignore.printStackTrace();
                    setStatus(Status.SERVER_ERROR_INTERNAL);
                    return new JsonRepresentation("(In insert into account) I'm sorry, user account was not created; please try again.");

            }

            try {
    /* INSERT shipping address information from sub-form object */
                JSONObject shippingAddress = (JSONObject) registrationForm.getJSONObject("shippingAddress");

                rs = st.execute(String.format("INSERT INTO address"
                                + "VALUES('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')",
                        this.username, shippingAddress.get("firstName").toString().trim(), shippingAddress.get("lastName"),
                        shippingAddress.get("streetAddress").toString().trim(), shippingAddress.get("identifier").toString().trim(), shippingAddress.get("city"),
                        shippingAddress.get("state").toString().trim(), shippingAddress.get("zipcode")));

            } catch( SQLException ignore) {

                try{
                    st.close();
                } catch( SQLException e ){
                    e.printStackTrace();
                }

                        setStatus(Status.SERVER_ERROR_INTERNAL);
                        return new JsonRepresentation("(In insert into address) I'm sorry, user account was not created; please try again.");

            }

    /* INSERT paymentMethod information sub-form object data according to type */

            String paymentMethod = registrationForm.get("pmtMethod").toString();
            JSONObject cAccountInfo = data.getJsonArray().getJSONObject(0).getJSONObject("credit");
            JSONObject chAccountInfo = data.getJsonArray().getJSONObject(0).getJSONObject("cash");

    if(paymentMethod.equalsIgnoreCase("credit")) {

            try {

                rs = st.execute(String.format("INSERT INTO payment_method"
                                + "VALUES('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')",
                        this.username, cAccountInfo.get("nameOnCard").toString().trim(), cAccountInfo.get("lastFour"),
                        cAccountInfo.get("expirationDate").toString().trim(), cAccountInfo.get("cardSecurityCode").toString().trim()));

            } catch( SQLException ignore) {

                try{
                    st.close();
                } catch( SQLException e ){
                    e.printStackTrace();
                }

                        setStatus(Status.SERVER_ERROR_INTERNAL);
                        return new JsonRepresentation("(In insert into payment_method - credit) I'm sorry, user account was not created; please try again.");

            }

    /* INSERT both billing address subform values into table billingAddress */
        try {

            JSONObject billingCredit = cAccountInfo.getJSONObject("billingAddress");
            rs = st.execute(String.format("INSERT INTO billingAddress"
                            + "VALUES('%s', '%s', '%s', '%s', '%s', '%s', '%s', 'CREDIT')",
                                 this.username, billingCredit.get("fullNameCredit").toString().trim(), billingCredit.get("streetAddress"),
                            billingCredit.get("identifier").toString().trim(), billingCredit.get("city").toString().trim(),
                        billingCredit.get("state").toString().trim(), billingCredit.get("zipcode").toString().trim()));

        } catch( SQLException ignore ) {

            try{
                st.close();
            } catch( SQLException e ){
                e.printStackTrace();
            }

                    setStatus(Status.SERVER_ERROR_INTERNAL);
                    return new JsonRepresentation("(In insert into billing address - credit) I'm sorry, user account was not created; please try again.");

        }

        try {

            JSONObject billingCash = chAccountInfo.getJSONObject("billingAddress");
            rs = st.execute(String.format("INSERT INTO billingAddress"
                            + "VALUES('%s', '%s', '%s', '%s', '%s', '%s', '%s', 'CASH')",
                    this.username, billingCash.get("username").toString().trim(), billingCash.get("fullNameChecking"),
                    billingCash.get("streetAddress").toString().trim(), billingCash.get("identifier").toString().trim(), billingCash.get("city"),
                    billingCash.get("state").toString().trim(), billingCash.get("zipcode").toString().trim()));

        } catch( SQLException ignore ) {

            try{
                st.close();
            } catch( SQLException e ){
                e.printStackTrace();
            }

                    setStatus(Status.SERVER_ERROR_INTERNAL);
                    return new JsonRepresentation("(In insert into billingAddress CASH - credit) I'm sorry, user account was not created; please try again.");

        }


                // extract checking account sub-form; then extract billingAddress sub-form object
    } else if(paymentMethod.equalsIgnoreCase("debit")) {

            try {

                rs = st.execute(String.format("INSERT INTO payment_method"
                                + "VALUES('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')",
                        this.username, cAccountInfo.get("nameOnCard").toString().trim(), cAccountInfo.get("lastFour"),
                        cAccountInfo.get("expirationDate").toString().trim(), cAccountInfo.get("cardSecurityCode").toString().trim()));

            } catch( SQLException ignore) {

                try{
                    st.close();
                } catch( SQLException e ){
                    e.printStackTrace();
                }

                        setStatus(Status.SERVER_ERROR_INTERNAL);
                        return new JsonRepresentation("(In insert into payment_method - debit) I'm sorry, user account was not created; please try again.");

            }


            /* INSERT both billing address subform values into table billingAddress */
            try {

                JSONObject billingCredit = cAccountInfo.getJSONObject("billingAddress");
                rs = st.execute(String.format("INSERT INTO billingAddress"
                                + "VALUES('%s', '%s', '%s', '%s', '%s', '%s', '%s', 'CASH')",
                        this.username, billingCredit.get("fullNameCredit").toString().trim(), billingCredit.get("streetAddress"),
                            billingCredit.get("identifier").toString().trim(), billingCredit.get("city"),
                                billingCredit.get("state").toString().trim(), billingCredit.get("zipcode").toString().trim()));

            } catch( SQLException ignore ) {

                try{
                    st.close();
                } catch( SQLException e ){
                    e.printStackTrace();
                }

                        setStatus(Status.SERVER_ERROR_INTERNAL);
                        return new JsonRepresentation("(In insert into billingAddress - debit) I'm sorry, user account was not created; please try again.");

            }

                // extract bank account sub-form; then extract billingAddress sub-form object
    } else if(paymentMethod.equalsIgnoreCase("check")) {


            try {
                rs = st.execute(String.format("INSERT INTO payment_method (username, fullNameChecking, routingNumber, driversLicenseNum, accountNumber)"
                                + "VALUES('%s', '%s', '%s', '%s', '%s')",
                        this.username, chAccountInfo.get("fullNameChecking").toString().trim(), chAccountInfo.get("routingNumber").toString().trim(), chAccountInfo.get("driversLicenseNum"),
                        chAccountInfo.get("accountNumber").toString().trim()));
            } catch (SQLException ignore) {

                try{
                    st.close();
                } catch( SQLException e ){
                    e.printStackTrace();
                }

                    if(!rs) {
                        setStatus(Status.SERVER_ERROR_INTERNAL);
                        return new JsonRepresentation("(In insert into payment_method - check) I'm sorry, user account was not created; please try again.");
                    }
            }

            try {
                JSONObject billingCash = chAccountInfo.getJSONObject("billingAddress");
                rs = st.execute(String.format("INSERT INTO billingAddress"
                                + "VALUES('%s', '%s', '%s', '%s', '%s', '%s', '%s', 'CASH')",
                        this.username, billingCash.get("fullName").toString().trim(), billingCash.get("streetAddress"),
                        billingCash.get("identifier").toString().trim(), billingCash.get("city"),
                        billingCash.get("state").toString().trim(), billingCash.get("zipcode").toString().trim()));

            } catch (SQLException ignore) {

                try{
                    st.close();
                } catch( SQLException e ){
                    e.printStackTrace();
                }

                        setStatus(Status.SERVER_ERROR_INTERNAL);
                        return new JsonRepresentation("(In insert into billingAddress - check) I'm sorry, user account was not created; please try again.");

            }

        }
        

            setStatus(Status.SUCCESS_OK);
            JSONObject creds = new JSONObject();
            return new JsonRepresentation(creds.put("credentials", new String[]{this.username, this.password}));

    }


}



