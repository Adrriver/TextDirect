/* Class: PriceReport
   Author: Adrian Rivera
   Date: 02/24/2017
*/

export class PriceReport {

    private itemISBN: String;
    private bookSeller: String;
    private itemURL: URL;
    private reporterUsername: String;
    private price: Number;
    private reportDate: String;
    private condition: String;
    private quantity: Number;
    private flagged: [Boolean, String]; // 'flagged' : Boolean, 'reason' : String 

    public setItemISBN(isbn: string): void {
        this.itemISBN = new String(isbn);
    }
    public getItemISBN(): String {
        return this.itemISBN;
    }

    public setBookSeller(seller: string) {
        this.bookSeller = new String(seller);
    }
    public getBookSeller(): String {
        return this.bookSeller;
    }

    public setItemURL(url: URL): void {
        this.itemURL = url;
    }
    public getItemURL(): URL {
        return this.itemURL;
    }

    public setReporterUsername(username: string): void {
        this.reporterUsername = new String(username);
    }
    public getReporterUsername(): String {
        return this.reporterUsername;
    }

    public setPrice(price: number): void {
        this.price = new Number(price);
    }
    public getPrice(): Number {
        return this.price;
    }

    public setReportDate(reportDate: string): void {
        this.reportDate = new String(reportDate);
    }
    public getReportDate(): String {
        return this.reportDate;
    }

    public setQuantity(quantity: number): void {
        this.quantity = new Number(quantity);
    }
    public getQuantity(): Number {
        return this.quantity;
    }

    public setFlagged(status: [boolean, string]): void {
        this.flagged['flagged'] = status[0];
        this.flagged['reason'] = status[1];
    }
    public getFlagged(): [Boolean, String] {
        return this.flagged;
    }

}
