export class Address {

    public firstName: string;
    public lastName: string;
    public streetNumber: string;
    public street: string;
    public aptNumber: string;
    public city: string;
    public state: string;
    public zipcode: string;
    public isPOBox: boolean;
    public POBox: string;



    public init(fName: string, lName:string, streetNum: string, street: string, aptNum: string, city: string,
        state: string, zip: string) {

        this.firstName = fName;
        this.lastName = lName;
        this.streetNumber = streetNum;
        this.street = street;
        this.aptNumber = aptNum;
        this.city = city;
        this.state = state;
        this.zipcode = zip;

    }

    public init(fName: string, lName: string, POBox: string, city: string, state: string, zip: string) {

        this.firstName = fName;
        this.lastName = lName;
        this.POBox = POBox;
        this.city = city;
        this.state = state;
        this.zipcode = zip;

    }

}
