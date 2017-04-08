package textdirect;

import org.restlet.Application;
import org.restlet.Restlet;
import org.restlet.Request;
import org.restlet.Response;
import org.restlet.routing.Router;
import org.restlet.data.Status;
import org.restlet.data.MediaType;

//Handles routing for all TextDirect data that may be persisted
public class TextDirect extends Application {
    @Override
    public synchronized Restlet createInboundRoot() {
	// To illustrate the different API possibilities, implement the
	// DELETE operation as an anonymous Restlet class. For the
	// remaining operations, follow Restlet best practices and
	// implement each as a Java class.

	// DELETE handler
	Restlet janitor = new Restlet(getContext()) {  
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
	    };  

	// Create the routing table.
	Router router = new Router(getContext());
	
	/* Corresponds with SessionService *
	 * Tasks:
	 * 1. New user account registration
	 * 2. Login/Logout (including retrieval of account data)
	 * 3. Manage session (validity)
	 * 4. Password retrieval
	 * 5. 
	 */
	 
	router.attach("/json",        JsonAllResource.class);
	router.attach("/create",      CreateResource.class);
	router.attach("/update",      UpdateResource.class);
	router.attach("/delete/{id}", janitor); // instance of anonymous class

	/* Corresponds with CurrentActivityService *
	 * Tasks:
	 * 1. GETs all user-account (customer role) pending orders data
	 * 2. POSTs item shipment data (merchant)
	 * 3. POSTs purchase acceptance-event data (customer)
	 * 3. POSTs purchase rejection-event data 
	 * 4. GETs all user-account (merchant role) pending sales data
	 * 5. GETs all user-account (merchant role) pending refunds data
	 * 6. PUTs merchant refund agreement at refund_req table
	 * 7. PUTs re-shipment confirmation data at refund_req table
	 */
	
	/* Corresponds with NewItemCreatorService *
	 * Tasks:
	 * 1. POSTs new sale item to table sale_item 
	 * 2. DELETEs sale item from table sale_item 
	 * 3. 
	 * 4.
	 * 5.
	 * 6.
	 */
	
	/* Corresponds with SearchService *
	 * Tasks:
	 * 1. GETs table sale_item search matches
	 * 2. GETs TextDirect user-account profile data
	 * 3. 
	 */
	
	/* Corresponds with TransactionHistoryService *
	 * Tasks:
	 * 1. GETs all successful and failed transaction data
	 * 	       for users (merchant and customer roles)
	 * 2. 
	 * 
	 */
	
	// Corresponds with CustomerRequestService
	
	// Corresponds with OrderSubmissionService
	
	
        return router;
    }
    
    private String badRequest(String msg) {
	Status error = new Status(Status.CLIENT_ERROR_BAD_REQUEST, msg);
	return error.toString();
    }

}   
