import { PaymentMethod } from './payment-method';
import { Address } from './address';
export class UserAccount {

    username: string;
    password: string;
    idVerQuestion: string;
    idVerAnswer: string;
    // TODO: ensure validator scrutinizes domain extension, enforcing '.edu' convention
    emailAddress: string;
    firstName: string;
    lastName: string;
    telephoneNumber: string;
    paymentMethod: PaymentMethod;
    shippingAddress: Address;
    isAdmin: boolean;
    registrationDate: Date;
    standing: boolean; // associated with incident or delinquency instance stored in DB
    userRating: number;

    UserAccount(username: string, pw: string, email: string, fName: string,
        lName: string, phone: string, payment: PaymentMethod, shipping: Address,
                isAdmin: boolean, memberSince: Date, standing: boolean,
                rating: number, idVerQuestion: string, idVerAnswer: string) {

        this.username = username;
        this.password = pw;
        this.idVerQuestion = idVerQuestion;
        this.idVerAnswer = idVerAnswer;
        this.emailAddress = email;


        this.firstName = fName;
        this.lastName = lName;
        this.telephoneNumber = phone;
        this.paymentMethod = payment;
        this.shippingAddress = shipping;
        this.isAdmin = isAdmin;
        this.registrationDate = memberSince;
        this.standing = standing;
        this.userRating = rating;

    }

}
