import { Item } from '../items/item';

export class Transaction {

    public transactionId: number;
    public merchant: string;
    public customer: string;
    public orderId: number;
    public dateReceived: Date;
    public depositDate: Date;
    public purchaseRating: number;
    public depositConfNum: number;
    public title: string;
    public authors: string;
    public edition: number;
    public isbn: string;
    public condition: string;
    public completionTime: Date;
    public actualShipDate: Date;

    public Transaction(username: string, transactNum: number, type: string, item: Item, timeProcessed: string) {

       /* this.username = username;
        this.transactionNumber = transactNum;
        this.type = type;
        this.item = item;
        this.timePaymentProcessed = timeProcessed;*/

    }

}
