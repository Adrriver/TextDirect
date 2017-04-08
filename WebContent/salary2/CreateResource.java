package salary2;

import org.restlet.resource.Post;
import org.restlet.resource.ServerResource;
import org.restlet.representation.Representation;
import org.restlet.representation.StringRepresentation;
import org.restlet.data.Status;
import org.restlet.data.MediaType;
import org.restlet.data.Form;

public class CreateResource extends ServerResource {
    public CreateResource() { }

    @Post
    public Representation create(Representation data) {
	Status status = null;
	String msg = null;

	// Extract the data from the POST body.
	Form form = new Form(data);
	String language = form.getFirstValue("language");	
	
	if (language == null) {
	    msg = "No language was given for the language-salary item.\n";
	    status = Status.CLIENT_ERROR_BAD_REQUEST;
	}
	else {
		double salary = form.getFirstValue("salary");
	    LanguageSalaries.add(language, salary);
	    msg = "The language-salary pair '" + language + "' - '" + salary + "' has been added.\n";
	    status = Status.SUCCESS_OK;
	}

	setStatus(status);
	return new StringRepresentation(msg, MediaType.TEXT_PLAIN);
    }
}


