import { PaymentMethod } from './payment-method';
import { Address } from './address';
export class UserAccount {

    //general account properties
    username: string;
    password: string;
    emailAddress: string; //verified college/university email account (.edu)
    firstName: string;
    lastName: string;
    telephoneNumber: string;
    paymentMethod: PaymentMethod;
    shippingAddress: Address;
    isAdmin: boolean;
    registrationDate: Date;
    standing: boolean; //associated with incident or delinquency instance stored in DB

    UserAccount(username: string, pw: string, email: string, fName: string,
        lName: string, phone: string, payment: PaymentMethod, shipping: Address, isAdmin: boolean, memberSince: Date, standing: boolean) {

        this.username = username;
        this.password = pw;
        this.emailAddress = email;
        this.firstName = fName;
        this.lastName = lName;
        this.telephoneNumber = phone;
        this.paymentMethod = payment;
        this.shippingAddress = shipping;
        this.isAdmin = isAdmin;
        this.registrationDate = memberSince;
        this.standing = standing;

    }

}
