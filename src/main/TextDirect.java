package main;

import itemcreatorservice.DeleteItem;
import itemcreatorservice.DirectTextbook;
import itemcreatorservice.NewSaleItem;
import itemcreatorservice.RetrieveItem;
import itemcreatorservice.UpdateItem;
import org.restlet.Application;
import org.restlet.Restlet;
import org.restlet.data.Status;
import org.restlet.service.Service;
import org.restlet.routing.Router;
import org.restlet.service.CorsService;
import currentactivity.ApprovePurchase;
import currentactivity.ApproveRefRequest;
import currentactivity.CreateRefundRequest;
import currentactivity.DisputeTransaction;
import currentactivity.ReShipmentConfirmation;
import currentactivity.RetrievePendingOrders;
import currentactivity.RetrieveRefunds;
import currentactivity.RetrievePendingSales;
import currentactivity.ShipmentConfirmation;
import currentactivity.UpdateRefund;
import customerrequestservice.CreateServiceRequest;
import customerrequestservice.DeleteAllRequests;
import customerrequestservice.DeleteRequest;
import customerrequestservice.RetrieveAllActive;
import customerrequestservice.RetrieveAllClosed;
import customerrequestservice.RetrieveAllResolved;
import customerrequestservice.RetrieveRequest;
import customerrequestservice.UpdateRequest;
import orderservice.SubmitOrder;
import searchservice.AllItemSearch;
import searchservice.AllUserAccount;
import searchservice.UserAccount;
import sessionservice.CreateAccount;
import sessionservice.DeleteUserAccount;
import sessionservice.LoginUser;
import sessionservice.LogoutUser;
import sessionservice.RetrieveSession;
import sessionservice.UpdateAccountInfo;
import sessionservice.UpdatePassword;
import textbook.CreateTBookRecord;
import transactionhistservice.AllTransactions;
import transactionhistservice.UpdateTransRating;
import tsrir.CreateTsrir;
import tsrir.DeleteAllTsrir;
import tsrir.DeleteTsrir;
import tsrir.RetrieveActiveTsrir;
import tsrir.RetrieveClosedTsrir;
import tsrir.RetrieveTsrir;
import tsrir.UpdateTsrir;

import java.util.Arrays;
import java.util.HashSet;

// Handles routing for all TextDirect data that may be persisted

/* **JSON Responses only are provided to Angular2 clients** */

public class TextDirect extends Application {

	private CorsService corsService;

	@Override
	public synchronized Restlet createInboundRoot() {
		// To illustrate the different API possibilities, implement the
		// Delete operation as an anonymous Restlet class. For the
		// remaining operations, follow Restlet best practices and
		// implement each as a Java class.

		// Set Allow-Access-Set-Control Header
		corsService = new CorsService();
		corsService.setAllowedOrigins(new HashSet(Arrays.asList("*")));

		// Create the routing table.
		Router router = new Router(getContext());

	/* Corresponds with SessionService *
	 * Tasks:
	 * 1. Creates new user account
	 * 2. Creates new user-account session (including retrieval of account data)
	 * 3. Retrieves (for management) user-account session 
	 * 4. Retrieves Secret Question (password reset)
	 * 5. Updates user-account password
	 * 6. Updates user-account information
	 * 7. Deletes user-account (preserves minimal record)
	 * 8. Delete session record
	 */

		router.attach("/create-account", CreateAccount.class);
		router.attach("/login/{username}", LoginUser.class);
		// RetrieveSession?
		router.attach("/get-credentials/session-info", RetrieveSession.class);
		router.attach("/get-credentials/secret-q", RetrieveSession.class);
		router.attach("/update-password", UpdatePassword.class);
		router.attach("/update-account", UpdateAccountInfo.class);
		router.attach("/delete", DeleteUserAccount.class); // instance of anonymous class
		router.attach("/logout", LogoutUser.class);
/*	router.attach("/json",        				   JsonAllResource.class);
	router.attach("/create",      				   CreateResource.class);
	router.attach("/update",      				   UpdateResource.class);*/

	/* Corresponds with CurrentActivityService *
	 * Tasks:
		1.	Creates item shipment data (merchant)
		2.	Creates purchase acceptance-event data (customer)
		3.	Creates purchase rejection-event data 
		4.  Creates refund request on behalf of user in customer role
		5.	Retrieves all user-account (customer role) pending orders data
		6.	Retrieves all user-account (merchant role) pending sales data
		7.	Retrieves all user-account (merchant role) pending refunds data
		8.	Updates merchant refund agreement at refund_req table
		9.	Updates re-shipment confirmation data at refund_req table
	 */

		/*1*/
		router.attach("/conf-ship", ShipmentConfirmation.class);
		/*2*/
		router.attach("/approve", ApprovePurchase.class);
		/*3*/
		router.attach("/dispute", DisputeTransaction.class);
		/*4*/
		router.attach("/get-pending-ord", RetrievePendingOrders.class);
		/*5*/
		router.attach("/get-pending-sales", RetrievePendingSales.class);
		/*6*/
		router.attach("/get-refs", RetrieveRefunds.class);//1-pending; 2-complete
		/*7*/
		router.attach("/init-ref", CreateRefundRequest.class); //creates refund record
		/*8*/
		router.attach("/approve-ref-request", ApproveRefRequest.class);
		/*9*/
		router.attach("/update-refund", UpdateRefund.class);
		/*10*/
		router.attach("/conf-reship", ReShipmentConfirmation.class);
		/*11*/  //router.attach("/)
		
		/* Corresponds with OrderSubmissionService *
		 * Tasks:
	 		1.  Creates new sale item order (for customer)	 	
		 */
		
		/*1*/
		router.attach("/submit-order", SubmitOrder.class);
	
	/* Corresponds with NewItemCreatorService *
	 * Tasks:
	 	1. Creates new sale item -> table sale_item 
	 	2. Retrieves sale item (valid updates by seller only)
	 	3. Retrieves all sale items from all users
	 	3. Updates sale item in table sale_item 
	  	4. Deletes sale item from table sale_item	 
	 */

		router.attach("/create-new-item", NewSaleItem.class);
		router.attach("/get-item", RetrieveItem.class);
		router.attach("/update-item", UpdateItem.class);
		router.attach("/delete-item/{itemId}", DeleteItem.class);
		router.attach("/search-direct-textbook/{isbn}", DirectTextbook.class);

	/* Handles DirectTextbook API utilization; corresponds with NewItemCreatorService */


	/* Corresponds with SearchService *
	 * Tasks:
	 * 1U. Retrieves search matches in table *sale_item* 
	 *    	   		(ISBN or Title/Author combination)
	 * Administrative:   
	 * 1A. Retrieves all TextDirect user-account data
	 * 2A. Retrieves single TextDirect user-account data
	 */

		router.attach("/search", AllItemSearch.class);
		router.attach("/search/{isbn}", AllItemSearch.class).setMatchingQuery(false);
		router.attach("/get-all-items", AllItemSearch.class);
		router.attach("/get-all-accounts", AllUserAccount.class);
		router.attach("/get-accounts", UserAccount.class);
		
	/* Create new textbook record -- stores relevant API response data
	 * Tasks:
	 * 1. Creates new textbook record for transition to local API
	 */

		router.attach("/add-textbook", CreateTBookRecord.class);
		
		
	/* Corresponds with TransactionHistoryService *
	 * Tasks:
	 * 1. Creates a new transaction record (called 
	 * 1. Retrieves all successful and failed transaction data
	 * 	       for users (merchant and customer roles)
	 * 2. Updates transaction record with a customer rating
	 * 
	 */
		router.attach("/get-all-trans", AllTransactions.class);
		router.attach("/set-trans-rating", UpdateTransRating.class);
		
	 /* Corresponds with CustomerRequestService *
	  * Tasks:
	  *	1.	Creates customer service requests
	  *	2.	Retrieves all active customer service requests
	  *	3.	Retrieves single customer service request
	  *	4.	Retrieves all resolved customer service requests
	  * 5.  Retrieves all closed customer service requests
	  *	6.	Updates a single customer service response
	  *	7.	Deletes all customer-request instance
	  *	8.	Deletes a single (given id) customer-request instance
	  */

		router.attach("/create-request", CreateServiceRequest.class);
		router.attach("/get-all-requests", RetrieveAllActive.class);
		router.attach("/get-request", RetrieveRequest.class);
		router.attach("/get-all-resolved", RetrieveAllResolved.class);
		router.attach("/get-all-closed", RetrieveAllClosed.class);
		router.attach("/update-request", UpdateRequest.class); // Response part of service req. is appended
		router.attach("/delete-all-requests", DeleteAllRequests.class);
		router.attach("/delete-request", DeleteRequest.class);
		
	/* Corresponds with CustomerRequestService *
	  * Tasks:	   ** TSRIR - technical service request/issue report**
	  *	1.	Creates a single TSRIR
	  *	2.	Retrieves all active TSRIR instances
	  * 3.  Retrieves all closed TSRIR cases
	  *	4.	Retrieves a single TSRIR	
	  *	5.	Updates a single TSRIR (e.g., status, transcript record, etc.)
	  *	6.	Deletes all closed TSRIR cases (instances)
	  *	7.	Deletes a single (given id) closed TSRIR instance
	  */

		router.attach("/create-tsrir", CreateTsrir.class);
		router.attach("/get-all-active", RetrieveActiveTsrir.class);
		router.attach("/get-all-closed", RetrieveClosedTsrir.class);
		router.attach("/get-tsrir", RetrieveTsrir.class);
		router.attach("/update-tsrir", UpdateTsrir.class); // e.g., update case transcript, status, etc.
		router.attach("/delete-all-closed", DeleteAllTsrir.class);
		router.attach("/delete-tsrir", DeleteTsrir.class);


		return router;
	}


	private String badRequest(String msg) {
		Status error = new Status(Status.CLIENT_ERROR_BAD_REQUEST, msg);
		return error.toString();

	}
}
