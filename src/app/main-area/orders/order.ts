import { Item } from '../items/item';

import DateTimeFormat = Intl.DateTimeFormat;

export class Order {

    public orderId: number; //Item ordered/to order and checkout outcome with detail string
    public quantity: number;
    public  title: string;
    public secTitle: string;
    public authors: string;
    public editors: string;
    public edition: number;
    public isbn: string;
    public condition;
    public shipmentDate: DateTimeFormat;
    public description: string;
    public merchant: string;
    public itemAccepted: number; // needs to be boolean T|F
    public acceptanceDate: DateTimeFormat;
    public actualShipDate: DateTimeFormat;
    public trackingNum: string;
    public publicationDate: Date;
    public publisher: string;
    public msrp: number;
    public salePrice: number;
    public intlEdit: boolean;
    public date: string;

    public Order() { }


}
