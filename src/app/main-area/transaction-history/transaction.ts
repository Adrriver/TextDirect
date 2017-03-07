import { Item } from '../items/item';

export class Transaction {

    public username: string;
    public transactionNumber: number;
    public type: string;
    public item: Item;   
    public timePaymentProcessed: string; // format: hh:mm:ss mm/dd/yyyy pertains to withdrawal or deposit completion   

    public Transaction(username: string, transactNum: number, type: string, item: Item, timeProcessed: string) {

        this.username = username;
        this.transactionNumber = transactNum;
        this.type = type;
        this.item = item;
        this.timePaymentProcessed = timeProcessed;

    }

}
