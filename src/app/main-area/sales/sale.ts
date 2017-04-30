import { Item } from '../items/item';
import DateTimeFormat = Intl.DateTimeFormat;

// MySQL table 'pending_order' supplies property data
export class Sale {

  public saleId: number; // Item ordered/to order and checkout outcome with detail string
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
  public customer: string;
  public itemAccepted: number; // needs to be boolean T|F
  public acceptanceDate: DateTimeFormat;
  public actualShipDate: DateTimeFormat;
  public trackingNum: string;
  public publicationDate: Date;
  public publisher: string;
  public msrp: number;
  public salePrice: number;
  public intlEdit: boolean;
  public saleDate: string;


    public constructor(){ };

  /* public constructor(item: Item, date: string, buyer: string, accepted: [string], shippingStatus: [string]) {

        this.item = item;
        this.dateOfSale = date;
        this.purchasedBy = buyer;
        this.accepted['accepted'] = accepted['accepted'];
        this.shippingStatus['shipped'] = shippingStatus['shipped'];

    } */

}
