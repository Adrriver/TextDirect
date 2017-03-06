import { PaymentMethod } from './payment-method'; 

export class UserAccount {

    //general account properties
    public username: string;
    public password: string;
    public emailAddress: string; //verified college/university email account (.edu)
    public firstName: string;
    public lastName: string;
    public telephoneNumber: string;
    public paymentMethod: PaymentMethod;
    

    public UserAccount(username: string, pw: string, email: string, fName: string,
                       lName: string, phone: string, payment: PaymentMethod)

    {

        this.username = username;
        this.password = pw;
        this.emailAddress = email;
        this.firstName = fName;
        this.lastName = lName;
        this.telephoneNumber = phone;
        this.paymentMethod = payment;      

    }

}
