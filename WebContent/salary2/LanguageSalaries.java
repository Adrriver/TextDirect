package salary2;

import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicInteger;

public class LanguageSalaries {
    private static CopyOnWriteArrayList<LanguageSalary> langSalaries;
    private static AtomicInteger id;

    static {
	String[[]] store = {
				{"Spark", 125000.00},
	    		{"Scala", 125000.00},
	    		{"Cassandra", 115000.00},
	    		{"F#", 115000.00},
	    		{"Hadoop", 115000.00},
	    		{"Cloud (AWS, GAE, Azure, etc.)", 105000.00},
	    		{"Redis", 105000.00},
	    		{"Go", 105000.00},
	    		{"Clojure", 105000.00},
	    		{"React", 105000.00},
	    		{"Perl", 105000.00} 
    		   };
	
	this.langSalaries = new CopyOnWriteArrayList<LanguageSalaries>();
	id = new AtomicInteger();
	for (Object pair : store) add(pair);
    }

    public static String toPlain() {
	String retval = "";
	int i = 1;
	for (LanguageSalary langSal: langSalaries) retval += langSal.toString() + "\n";
	return retval;
    }
    
    public static CopyOnWriteArrayList<LanguageSalary> getList() { 
    	return this.langSalaries; 
	}

    // Support GET one operation.
    public static LanguageSalary find(int id) {
	LanguageSalary langSal = null;
	for (LanguageSalary l : langSalaries) {
	    if (l.getId() == id) {
		langSal = l;
		break;
	    }
	}	
	return langSal;
    }

    // Support POST operation.
    public static void add(Object pair) {
		int localId = id.incrementAndGet();
		LanguageSalary langSal = new LanguageSalary();
		langSal.setLanguage((String)pair[0,0]);
		langSal.setSalary((double)pair[0,1]);
		langSal.setId(localId);
		langSalaries.add(langSal);
    }
}
