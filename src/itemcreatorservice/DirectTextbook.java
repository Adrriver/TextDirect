package itemcreatorservice;


import javax.ws.rs.Path;
import javax.ws.rs.core.GenericType;
import javax.ws.rs.core.Response;
import org.restlet.engine.converter.ConverterHelper;
import org.restlet.ext.xml.XmlConverter;
import org.restlet.resource.Get;
import org.restlet.resource.ServerResource;
import org.restlet.ext.json.JsonRepresentation;
import org.restlet.data.Status;
import javax.ws.rs.client.Invocation;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.WebTarget;
import org.json.JSONObject;
import org.json.XML;
import javax.xml.bind.JAXBElement;

/**
 * Created by Adrian on 4/17/2017.
 *
 *  ISBN-10 & -13 Book Price URLs:
 *
 *  http://www.directtextbook.com/xml.php?key=47ac79ce5903e90ad84d7bc45ae5af45&ean=9780136006176
 *
 *  Or for the same book, using a 10-digit ISBN:
 *
 *  http://www.directtextbook.com/xml.php?key=47ac79ce5903e90ad84d7bc45ae5af45&isbn=0136006175
 *
 **/
public class DirectTextbook extends ServerResource {

    private static String baseURL;
    private static Client client;
    private WebTarget target; // DirectTextbooks.com API
    private static Response res;
    private JSONObject jsonObject;
    private JAXBElement jaxbElement;
    private static Response response;
    private static String resString;
    private static ConverterHelper ch;
    private static Invocation invocation;

    public DirectTextbook() {

        baseURL = "http://www.directtextbook.com/xml.php?key=47ac79ce5903e90ad84d7bc45ae5af45";
        client = ClientBuilder.newBuilder().register(XmlConverter.class).build();
        this.jsonObject = new JSONObject();

    }

    @Get()
    public String getBookPrices() {
        String isbnData = this.getRequestAttributes().get("isbn").toString().split("[=]")[1];

        int isbnLength = isbnData.length();

        // Build WebTarget instance with ClientBuilder
        this.target = client.target(baseURL).queryParam("ean", isbnData);


        if (isbnLength == 13) {

             invocation = this.target.request("text/xml")
                                    .accept("text/xml").buildGet();

             resString = invocation.invoke(String.class);
             client.close();

            setStatus(Status.SUCCESS_OK);
            return XML.toJSONObject(resString).toString();
        }
        /*else if(isbnLength == 10) {
            //DirectTextbook.data = dt.queryParam("isbn", isbnData).request().get(XML.class);
            setStatus(Status.SUCCESS_OK);
            return jsonObject.put("data", data);
        } else {
            setStatus(Status.CLIENT_ERROR_BAD_REQUEST);
            return jsonObject.put("Error", "invalid ISBN code").toString();
        }*/


        return jsonObject.put("Error", "Something went wrong.").toString();

    }


    /*private class BookPrice {

        protected


    }*/


}
