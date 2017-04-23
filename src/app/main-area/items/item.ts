/* Class: Item
   Author: Adrian Rivera
   Date: 02/24/2017
*/

export class Item {

    //properties
    public bookTitle: string;
    public secondaryTitle: string;
    public authors: string;
    public editors: string;
    public edition: number;
    public publicationDate: string;
    public publisher: string;
    public ISBN: string;
    public MSRP: number;
    public pageCount: number;
    public salePrice: number;
    public condition: string;
    public internationalEdition: boolean;
    public shipsOn: string;
    public itemId: number;
    public description: string;
    public sellerUsername: string;

    public Item(title, secTitle, authors, editors, edition, pubDate, publisher,
        isbn, msrp, price, condition, intEd, ships, itemId, desc, seller) {

        this.bookTitle = title;
        this.secondaryTitle = secTitle;
        this.authors = authors;
        this.editors = editors;
        this.edition = edition;
        this.publicationDate = pubDate;
        this.publisher = publisher;
        this.ISBN = isbn;
        this.MSRP = msrp;
        this.salePrice = price;
        this.condition = condition;
        this.internationalEdition = intEd;
        this.shipsOn = ships;
        this.itemId = itemId;
        this.description = desc;
        this.sellerUsername = seller;

    }
}
