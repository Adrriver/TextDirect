import { Address } from './address';

export class PaymentMethod {

    //Credit or Debit Card account members
    public nameOnCard: string;
    public lastFour: number; //also serves to store full 16-digit credit card number
    public expirationDate: string;
    public provider: string;    
    public billingAddress: Address;
    public cardSecurityCode: number;

    //Checking account members
    public accountHolderName: string;
    public routingNum: string;
    public accountNum: string;
    public licenseNum: string;
    public billingAddressChecking: Address;
    
    public constructor(name: string, lastFour: number, expDate: string, provider: string,
        shipping: Address, billing: Address, CVV: number, ahn: string, routing: string, accNum: string,
        licNum: string, billingChk: Address)
    {
        this.nameOnCard = name;
        this.lastFour = lastFour;
        this.expirationDate = expDate;
        this.provider = provider;   
        this.billingAddress = billing;
        this.cardSecurityCode = CVV;
        this.accountHolderName = ahn;
        this.routingNum = routing;
        this.accountNum = accNum;
        this.licenseNum = licNum;
        this.billingAddressChecking = billingChk;
    }
    

}
