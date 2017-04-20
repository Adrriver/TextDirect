import { Item } from '../items/item';

// MySQL table 'pending_order' supplies property data
export class Sale {

    public item: Item;
    public dateOfSale: string;
    public purchasedBy: string; // must be registered user name
    public accepted: [string]; // item accepted by individual by whom item was purchased {"pending", "accepted", "rejected"}
    public shippingStatus: [string]; // 'shipped' : {'status': (t | f), 'timeOfShipment': (date/time) as string}


    public Sale(item: Item, date: string, buyer: string, accepted: [string], shippingStatus: [string]) {

        this.item = item;
        this.dateOfSale = date;
        this.purchasedBy = buyer;
        this.accepted['accepted'] = accepted['accepted'];
        this.shippingStatus['shipped'] = shippingStatus['shipped'];

    }

}
