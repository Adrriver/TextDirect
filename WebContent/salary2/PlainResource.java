package salary2;

import org.restlet.resource.Get;
import org.restlet.resource.ServerResource;
import org.restlet.representation.Representation;
import org.restlet.representation.StringRepresentation;
import org.restlet.data.Status;
import org.restlet.data.MediaType;

public class PlainResource extends ServerResource {
    public PlainResource() { }

    @Get
    public Representation toPlain() {
	String languages = Languages.toPlain();
	setStatus(Status.SUCCESS_OK);
	return new StringRepresentation(languages, MediaType.TEXT_PLAIN);
    }
}


