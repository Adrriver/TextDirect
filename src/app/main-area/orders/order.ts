import { Item } from '../items/item';

export class Order {

    public items: [number]; //Item ordered/to order and checkout outcome with detail string
    public username: string;
    public date: string;    

    public Order(items:[number], username: string, date: string) {

        
        this.items = items;
        this.username = username;
        this.date = date;        

    }

    public setItemPurchaseOutcome(itemId: number, outcome: boolean, detail: string): void {

        this.items[itemId]['outcome'] = outcome;
        this.items[itemId]['detail'] = detail;

    }
}
