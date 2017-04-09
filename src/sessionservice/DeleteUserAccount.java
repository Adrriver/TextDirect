package sessionservice;

import org.restlet.Request;
import org.restlet.Response;
import org.restlet.data.Status;
import org.restlet.resource.ServerResource;

import textdirect.LanguageSalaries;
import textdirect.LanguageSalary;

import org.restlet.data.MediaType;
  
/* TODO: Update to handle UserAccount deletion */ 
public class DeleteUserAccount extends ServerResource {
		public void handle(Request request, Response response) {  
		    String msg = null;

		    String sid = (String) request.getAttributes().get("id");
		    if (sid == null) msg = badRequest("No ID given.\n");

		    Integer id = null;
		    try { 
			id = Integer.parseInt(sid.trim());
		    }
		    catch(Exception e) { msg = badRequest("Ill-formed ID.\n"); }

		    LanguageSalary langSalary = LanguageSalaries.find(id);
		    if (langSalary == null) 
			msg = badRequest("No language with ID " + id + "\n");
		    else {
			LanguageSalaries.getList().remove(langSalary);
			LanguageSalaries.sortList();
			msg = "Language " + id + " removed.\n";
		    }
		    
		    // Generate HTTP response.
		    response.setEntity(msg, MediaType.TEXT_PLAIN);  
		}  
		
	public String badRequest(String msg) {
		
		Status error = new Status(Status.CLIENT_ERROR_BAD_REQUEST, msg);
		return error.toString();
	}
	
}