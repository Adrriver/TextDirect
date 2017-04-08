package salary2;

import java.util.concurrent.atomic.AtomicInteger;

public class LanguageSalary {
    private String technology;
    private double salary;
    private int id;

    public TechnologySalary() {
    	this.id = new AtomicInteger();
    }
    
    // overrides
    @Override
    public String toString() {
	return String.format("%2d: ", this.id) 
						  + this.technology
						  + "-- : $" 
						  + this.salary + " (USD)";
    }
    
    // properties
    public void setTechnology(String technology) { 
    	this.technology = technology.substring(0,1).toUpperCase() 
    				    + technology.substring(1); 	
    }
    public String getTechnology() { return this.technology; }
    
    public void setSalary(int salary) { this.salary = salary; }
    public int getSalary() { return this.salary; }

    public void setId(int id) { this.id = id; }
    public int getId() { return this.id; }
}