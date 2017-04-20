package itemcreatorservice;

import org.restlet.service.CorsService;
import org.json.JSONObject;
import org.restlet.data.*;
import org.restlet.representation.Representation;
import org.restlet.representation.StringRepresentation;
import org.restlet.resource.Get;

import org.restlet.resource.ServerResource;
import org.restlet.resource.Post;
import org.restlet.representation.Representation;
import org.restlet.ext.json.JsonRepresentation;
import org.restlet.data.Status;
import org.restlet.data.MediaType;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.WebTarget;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
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
    private static CorsService corsService;

    public DirectTextbook() {
        baseURL = "http://www.directtextbook.com/xml.php?key=47ac79ce5903e90ad84d7bc45ae5af45";
        client = ClientBuilder.newClient();
        // corsService.setAllowedOrigins(new HashSet(Arrays.asList("*")));
        // this.getApplication().getServices().add(corsService);
    }

    @Get()
    public Representation getBook(Representation isbn) {
        Form isbnData = new Form(isbn);

        String isbnStr = isbnData.getQueryString();
        System.out.println(isbnStr);

        if(isbnStr == null)
            return new JsonRepresentation("{\"message\":\"hello\"}");
        int isbnLength = 0;

        isbnLength = isbnStr.length();

        DirectTextbook.dt = client.target(baseURL);
        setStatus(Status.SUCCESS_OK);
        return new JsonRepresentation(JSONObject.stringToValue(isbnStr));
        /*if (isbnLength == 13) {
            setStatus(Status.SUCCESS_OK);
            DirectTextbook.data = DirectTextbook.dt.queryParam("ear", isbnStr).request().get(JSONObject.class);
            return new JsonRepresentation(data);
        }
        else if(isbnLength == 10) {
            DirectTextbook.data = dt.queryParam("isbn", isbnStr).request().get(JSONObject.class);
            setStatus(Status.SUCCESS_OK);
            return new JsonRepresentation(data);
        } else {
            setStatus(Status.CLIENT_ERROR_BAD_REQUEST);
            return new JsonRepresentation("invalid ISBN code");
        }*/


    }


}
