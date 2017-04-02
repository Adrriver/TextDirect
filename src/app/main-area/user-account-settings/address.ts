export class Address {

    public firstName: string;
    public lastName: string;
    public streetAddress: string;
    public identifier: string;
    public city: string;
    public state: string;
    public zipcode: string;

    // method as constructor for residential address...method 'box' for PO Box
    constructor(fName: string, lName:string, streetAdd: string, street: string, id: string, city: string,
                state: string, zip: string) {

        this.firstName = fName;
        this.lastName = lName;
        this.streetAddress = streetAdd;        
        this.identifier = id; //apartment or unit value
        this.city = city;
        this.state = state;
        this.zipcode = zip;

    }

}
