import { Item } from '../items/item';

export class Order {

    public items: [string]; //Item ordered/to order and checkout outcome with detail string
    public username: string;
    public date: string;
    public isPaymentSuccessful: [string];

    public Order(items: [Item], username: string, date: string) {

        this.items = items;
        this.username = username;
        this.date = date;        

    }

    public setItemPurchaseOutcome(item: Item): void {

        items[item.toString()] = [

    }
}
