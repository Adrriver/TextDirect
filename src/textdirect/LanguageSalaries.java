package textdirect;

import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicInteger;

public class LanguageSalaries {
    private static CopyOnWriteArrayList<LanguageSalary> langSalaries;
    private static AtomicInteger id;

    static {
	Object[][] store = {
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
	
	langSalaries = new CopyOnWriteArrayList<LanguageSalary>();
	id = new AtomicInteger();
	id.set(1);
	for (Object[] pair : store) add((String)pair[0],(double)pair[1]);
    }

    public static String toPlain() {
	String retval = "";
	for (LanguageSalary langSal: langSalaries) retval += langSal.toString() + "\n";
	return retval;
    }
    
    public static CopyOnWriteArrayList<LanguageSalary> getList() { 
    	return langSalaries; 
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
    public static void add(String tech, Double salary) {
		int localId = id.incrementAndGet();
		LanguageSalary langSal = new LanguageSalary();
		langSal.setTechnology(tech);
		langSal.setSalary(salary);
		langSal.setId(localId);
		langSalaries.add(langSal);
		sortList();		
    }
    
    public static void sortList(){
    	langSalaries.sort(
				(LanguageSalary l1, LanguageSalary l2)
					-> -l1.getSalary().compareTo(l2.getSalary()));
		langSalaries.sort(
				(LanguageSalary l1, LanguageSalary l2)-> {
					 if(l1.getSalary().compareTo(l2.getSalary()) == 0){						 
						 return l1.getTechnology().compareToIgnoreCase(l2.getTechnology());
					 } else {
						 return -l1.getSalary().compareTo(l2.getSalary());
					 }
				 });
		for(LanguageSalary t: langSalaries){
			if(id.get() <= langSalaries.size())
				t.setId(id.getAndIncrement());
			else {
				id.set(1);
				t.setId(id.getAndIncrement());
			}
		}
    }
}
