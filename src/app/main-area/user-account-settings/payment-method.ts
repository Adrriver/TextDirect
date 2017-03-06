import { Address } from './address';

export class PaymentMethod {

    public nameOnCard: string;
    public lastFour: number; //also serves to store full 16-digit credit card number
    public expirationDate: string;
    public provider: string;
    public shippingAddress: Address;
    public billingAddress: Address;
    public cardSecurityCode: number;
    
    public PaymentMethod(name: string, lastFour: number, expDate: string, provider: string,
        shipping: Address, billing: Address, CVV: number)
    {
        this.nameOnCard = name;
        this.lastFour = lastFour;
        this.expirationDate = expDate;
        this.provider = provider;   
        this.shippingAddress = shipping;
        this.billingAddress = billing;
        this.cardSecurityCode = CVV;
    }
    

}
