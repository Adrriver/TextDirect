/* Class: PriceReport
   Author: Adrian Rivera
   Date: 02/24/2017
*/

export class PriceReport {

    public productISBN: string;
    public bookSeller: string;
    public productURL: string;
    public reporterUsername: string;
    public price: number;
    public reportDate: string;
    public condition: string;
    public quantity: number;
    public flagged: [boolean, string]; // 'flagged' : Boolean, 'reason' : string 

    //single constructor 
    public PriceReport(isbn: string, seller: string, url: string, reporter: string, price: number,
        reportDate: string, condition: string, quantity: number, flagged: [boolean, string]) {

        this.productISBN = isbn;
        this.bookSeller = seller;
        this.productURL = url;
        this.reporterUsername = reporter;
        this.price = price;
        this.reportDate = reportDate;
        this.condition = condition;
        this.quantity = quantity;
        this.flagged['flagged'] = false;
        this.flagged['reason'] = "";
    }

}
