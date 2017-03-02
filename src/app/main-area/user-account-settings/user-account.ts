import { Address } from './address';

export class UserAccount {

    //general account properties
    public username: string;
    public password: string;
    public firstName: string;
    public lastName: string;
    public telephoneNumber: string;
    public shippingAddress: Address;
    public billingAddress: Address;

    public UserAccount(username: string, pw: string, fName: string, lName: string, phone: string,
        shipping: Address, billing: Address) {

        this.username = username;
        this.password = pw;
        this.firstName = fName;
        this.lastName = lName;
        this.telephoneNumber = phone;
        this.shippingAddress = shipping;
        this.billingAddress = billing;

    }

}
