package salary2;

import org.restlet.resource.Put;
import org.restlet.resource.ServerResource;
import org.restlet.representation.Representation;
import org.restlet.representation.StringRepresentation;
import org.restlet.data.Status;
import org.restlet.data.MediaType;
import org.restlet.data.Form;

public class UpdateResource extends ServerResource {
    public UpdateResource() { }

    @Put
    public Representation update(Representation data) {
	Status status = null;
	String msg = null;

	// Extract the data from the POST body.
	Form form = new Form(data);
	String sid = form.getFirstValue("id");
	String technology = form.getFirstValue("technology");
	double salary = form.getFirstValue("salary");

	if (sid == null || words == null) {
	    msg = "An ID and new words must be provided.\n";
	    status = Status.CLIENT_ERROR_BAD_REQUEST;
	}
	else {
	    int id = Integer.parseInt(sid.trim());
	    technologySalary techSal = technologySalaries.find(id);
	    if (techSal == null) {
		msg = "There is no technology-salary pair with ID " + id + "\n";
		status = Status.CLIENT_ERROR_BAD_REQUEST;
	    }
	    else {
		techSal.setTechnology(technology);
		techSal.setSalary(salary);
		
		msg = "technology - salary" + id + " has been updated to '" 
			   + technology + "' '" + salary "'.\n";
		status = Status.SUCCESS_OK;
	    }
	}

	setStatus(status);
	return new StringRepresentation(msg, MediaType.TEXT_PLAIN);
    }
}


