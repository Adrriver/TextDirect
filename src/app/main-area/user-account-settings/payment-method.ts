import { Address } from './address';

export class PaymentMethod {

    //Credit or Debit Card account members
    lastFour: number; //also serves to store full 16-digit credit card number
    expirationDate: string;
    billingAddress: Address;
    cardSecurityCode: number;

    //Checking account members
    accountHolderName: string;
    routingNum: string;
    accountNum: string;
    licenseNum: string;
    billingAddressChecking: Address;
    
    public constructor(public nameOnCard: string, lastFour: number, expDate: string, provider: string,
        shipping: Address, billing: Address, CVV: number, ahn: string, routing: string, accNum: string,
        licNum: string, billingChk: Address)
    {
      this.lastFour = lastFour;
        this.expirationDate = expDate;         
        this.billingAddress = billing;
        this.cardSecurityCode = CVV;
        this.accountHolderName = ahn;
        this.routingNum = routing;
        this.accountNum = accNum;
        this.licenseNum = licNum;
        this.billingAddressChecking = billingChk;
    }
    

}
