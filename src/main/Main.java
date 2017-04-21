package main;

import org.restlet.Component;
import org.restlet.data.Protocol;
import org.restlet.service.CorsService;

public class Main {

	// CorsService allows cross-origin calls from Angular2 new-item-creator.service
	private static CorsService corsService;

    public static void main(String[ ] args) throws Exception {

	// Create a new Component.  
	Component component = new Component();  
	
	// Add a new HTTP server listening on port 8182.  
	component.getServers().add(Protocol.HTTP, 8080);

	//



		// Attach the application.
	component.getDefaultHost().attach("/textdirect", new TextDirect());

	// Start the web server.  
	component.start();

	// Attempt to achieve connection to MySQL DB

	}
}
