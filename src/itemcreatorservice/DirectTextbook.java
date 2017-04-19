package itemcreatorservice;

import com.sun.xml.internal.ws.client.sei.ResponseBuilder;
import org.json.JSONObject;
import org.restlet.data.*;
import org.restlet.representation.Representation;
import org.restlet.representation.StringRepresentation;
import org.restlet.resource.Get;
import org.restlet.resource.ServerResource;
import org.restlet.engine.header.HeaderUtils;
import org.restlet.resource.Post;
import org.restlet.representation.Representation;
import org.restlet.ext.json.JsonRepresentation;
import org.restlet.data.Status;
import org.restlet.data.MediaType;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.WebTarget;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashSet;

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
    private static WebTarget dt; // DirectTextbooks.com API
    private static JSONObject data;
    private static Header corsService;

    public DirectTextbook() {
        baseURL = "http://www.directtextbook.com/xml.php?key=47ac79ce5903e90ad84d7bc45ae5af45";
        client = ClientBuilder.newClient();
    }

    @Get
    public Representation getBook(Representation isbn) {

        int isbnLength = 0;
        try {
            isbnLength = isbn.getText().length();
        } catch(IOException e){
            e.printStackTrace();
        }
        String status = null;

        DirectTextbook.dt = client.target(baseURL);

        if (isbnLength == 13) {
            setStatus(Status.SUCCESS_OK);
            DirectTextbook.data = DirectTextbook.dt.queryParam("ear", isbn).request().get(JSONObject.class);
            return new JsonRepresentation(data);
        }
        else if(isbnLength == 10) {
            DirectTextbook.data = dt.queryParam("isbn", isbn).request().get(JSONObject.class);
            setStatus(Status.SUCCESS_OK);
            return new JsonRepresentation(data);
        } else {
            setStatus(Status.CLIENT_ERROR_BAD_REQUEST);
            return new StringRepresentation("invalid ISBN code", MediaType.TEXT_PLAIN);
        }


    }


}
