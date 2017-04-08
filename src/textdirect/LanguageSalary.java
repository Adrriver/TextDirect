package textdirect;

public class LanguageSalary {
    private String technology;
    private Double salary;
    private int id;

    public LanguageSalary() { }
    
    // overrides
    @Override
    public String toString() {
	return String.format("%2d: ", this.id)
						  + "Technology: "
						  + this.technology
						  + "\n\t$" 
						  + String.format("%.2f", this.salary) + " (USD)";
    }
    
    // properties
    public void setTechnology(String technology) { 
    	this.technology = technology.substring(0,1).toUpperCase() 
    				    + technology.substring(1); 	
    }
    public String getTechnology() { return this.technology; }
    
    public void setSalary(double salary) { this.salary = salary; }
    public Double getSalary() { return this.salary; }

    public void setId(int id) { this.id = id; }
    public int getId() { return this.id; }
}