package main;

import org.restlet.Application;
import org.restlet.Restlet;
import org.restlet.routing.Router;

import currentactivity.ApprovePurchase;
import currentactivity.ApproveRefRequest;
import currentactivity.DisputeTransaction;
import currentactivity.ReShipmentConfirmation;
import currentactivity.RetrievePendingOrders;
import currentactivity.RetrievePendingRefunds;
import currentactivity.RetrievePendingSales;
import currentactivity.ShipmentConfirmation;
import customerrequestservice.CreateServiceRequest;
import customerrequestservice.DeleteAllRequests;
import customerrequestservice.DeleteRequest;
import customerrequestservice.RetrieveAllRequests;
import customerrequestservice.RetrieveAllResolved;
import customerrequestservice.RetrieveRequest;
import customerrequestservice.UpdateRequest;
import itemcreatorservice.DeleteItem;
import itemcreatorservice.NewSaleItem;
import itemcreatorservice.RetrieveItem;
import itemcreatorservice.UpdateItem;
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
import transactionhistservice.AllTransactions;


// Handles routing for all TextDirect data that may be persisted

/* **JSON Responses only are provided to Angular2 clients** */

public class TextDirect extends Application {
    @Override
    public synchronized Restlet createInboundRoot() {
	// To illustrate the different API possibilities, implement the
	// DELETE operation as an anonymous Restlet class. For the
	// remaining operations, follow Restlet best practices and
	// implement each as a Java class.

	// Create the routing table.
	Router router = new Router(getContext());
	
	/* Corresponds with SessionService *
	 * Tasks:
	 * 1. CREATEs new user account
	 * 2. CREATEs new user-account session (including retrieval of account data)
	 * 3. RETRIEVEs (for management) user-account session 
	 * 4. RETRIEVEs Secret Question (password reset)
	 * 5. UPDATEs user-account password
	 * 6. UPDATEs user-account information
	 * 7. DELETEs user-account (preserves minimal record)
	 * 8. DELETEs session record
	 */
	 
	router.attach("/create-account", 			   CreateAccount.class);
	router.attach("/login", 		 			   LoginUser.class);
	router.attach("/get-credentials/session-info", RetrieveSession.class);
	router.attach("/get-credentials/secret-q",	   RetrieveSession.class);
	router.attach("/update-password", 			   UpdatePassword.class);
	router.attach("/update-account", 			   UpdateAccountInfo.class);	
	router.attach("/delete", 	  				   DeleteUserAccount.class); // instance of anonymous class
	router.attach("/logout", 	  				   LogoutUser.class);
/*	router.attach("/json",        				   JsonAllResource.class);
	router.attach("/create",      				   CreateResource.class);
	router.attach("/update",      				   UpdateResource.class);*/

	/* Corresponds with CurrentActivityService *
	 * Tasks:
		1.	CREATEs item shipment data (merchant)
		2.	CREATEs purchase acceptance-event data (customer)
		3.	CREATEs purchase rejection-event data 
		4.	RETRIEVEs all user-account (customer role) pending orders data
		5.	RETRIEVEs all user-account (merchant role) pending sales data
		6.	RETRIEVEs all user-account (merchant role) pending refunds data
		7.	UPDATEs merchant refund agreement at refund_req table
		8.	UPDATEs re-shipment confirmation data at refund_req table
	 */

		router.attach("/conf-ship", ShipmentConfirmation.class);
		router.attach("/approve", ApprovePurchase.class);
		router.attach("/dispute", DisputeTransaction.class);
		router.attach("/get-pending-ord", RetrievePendingOrders.class);
		router.attach("/get-pending-sales", RetrievePendingSales.class);
		router.attach("/get-pending-refs", RetrievePendingRefunds.class);
		router.attach("/approve-ref", ApproveRefRequest.class);
		router.attach("/conf-reship", ReShipmentConfirmation.class);
		
	/* Corresponds with NewItemCreatorService *
	 * Tasks:
	 	1. CREATEs new sale item -> table sale_item 
	 	2. RETRIEVEs sale item (valid updates by seller only)
	 	3. UPDATEs sale item in table sale_item 
	  	4. DELETEs sale item from table sale_item	 
	 */
	
		router.attach("/create-new-item", NewSaleItem.class);
		router.attach("/get-item", RetrieveItem.class);
		router.attach("/update-item", UpdateItem.class);
		router.attach("/delete-item", DeleteItem.class);
		
	/* Corresponds with SearchService *
	 * Tasks:
	 * 1U. RETRIEVEs search matches in table *sale_item* 
	 *    	   		(ISBN or Title/Author combination)
	 * Administrative:   
	 * 1A. RETRIEVEs all TextDirect user-account data
	 * 2A. RETRIEVEs single TextDirect user-account data
	 */
	
		router.attach("/search", AllItemSearch.class);
		router.attach("/get-all-accounts", AllUserAccount.class);
		router.attach("/get-accounts", UserAccount.class);
		
	/* Corresponds with TransactionHistoryService *
	 * Tasks:
	 * 1. RETRIEVEs all successful and failed transaction data
	 * 	       for users (merchant and customer roles)
	 * 2. 
	 * 
	 */
		
		router.attach("/get-all-trans", AllTransactions.class);		
		
	 /* Corresponds with CustomerRequestService *
	  * Tasks:
	  *	1.	CREATES customer service requests
	  *	2.	RETRIEVES all customer service requests
	  *	3.	RETRIEVES single customer service request
	  *	4.	RETRIEVES all resolved customer service requests
	  *	5.	UPDATES a single customer service response
	  *	6.	DELETEs all customer-request instance
	  *	7.	DELETEs a single (given id) customer-request instance
	  */
	
		router.attach("/create-request", CreateServiceRequest.class);
		router.attach("/get-all-requests", RetrieveAllRequests.class);
		router.attach("/get-request", RetrieveRequest.class);
		router.attach("/get-all-resolved", RetrieveAllResolved.class);
		router.attach("/update-request", UpdateRequest.class); // Response part of service req. is appended
		router.attach("/delete-all-requests", DeleteAllRequests.class);
		router.attach("/delete-request", DeleteRequest.class);
		
	/* Corresponds with OrderSubmissionService *
	 * Tasks:
	 	1.  CREATEs new sale item order (for customer)	 	
	 */
		
		router.attach("/submit-order", SubmitOrder.class );
		
        return router;
    }
    

}   
