/* Class: Item
   Author: Adrian Rivera
   Date: 02/24/2017
*/

export class Item {

    //properties
    private bookTitle: String;
    private secondaryTitle: String;
    private authors: String;
    private editors: String;
    private edition: Number;
    private publicationDate: String;
    private publisher: String;
    private ISBN: String;
    private MSRP: Number;
    private salePrice: Number;
    private condition: String;
    private internationalEdition: Boolean;
    private shipsOn: String;
    private itemId: Number;
    private description: String;

    //accessors and mutators
    public setBookTitle(title: string): void {
        this.bookTitle = new String(title);
    }
    public getBookTitle(): String {
        return this.bookTitle;
    }

    public setSecondaryTitle(sTitle: string): void {
        this.secondaryTitle = new String(sTitle);          
    }
    public getSecondaryTitle(): String {
        return this.secondaryTitle;
    }

    public setAuthors(authors: string): void {
        let authorsUnformatted = authors.split(",");
        this.authors = new String();

        authorsUnformatted.forEach((author) => {
            this.authors += author + " ";
        });
    }
    public getAuthors(): String {
        return this.authors;
    }

    public setEditors(editors: string): void {
        let editorsUnformatted = editors.split(",");
        this.editors = new String();

        editorsUnformatted.forEach((editor) => {
            this.editors += editor + " ";
        });
    }
    public getEditors(): String {
        return this.editors;
    }

    public setEdition(edition: number): void {
        this.edition = new Number(edition);
    }
    public getEdition(): Number {
        return this.edition;
    }   

    public setPublicationDate(date: string): void {
        this.publicationDate = new String(date);
    }
    public getPublicationDate(): String {
        return this.publicationDate;
    }

    public setPublisher(publisher: string): void {
        this.publisher = new String(publisher);
    }
    public getPublisher(): String {
        return this.publisher;
    }

    public setISBN(isbn: string): void {
        this.ISBN = new String(isbn);
    }
    public getISBN(): String {
        return this.ISBN;
    }

    public setMSRP(msrp: number): void {
        this.MSRP = new Number(msrp);
    }
    public getMSRP(): Number {
        return this.MSRP;
    }

    public setSalesPrice(price: number): void {
        this.salePrice = new Number(price);
    }
    public getSalesPrice(): Number {
        return this.salePrice;
    }

    public setCondition(condition: string): void {
        this.condition = condition;
    }
    public getCondition(): String {
        return this.condition;
    }

    public setInternationalEdition(intEd: Boolean): void {
        this.internationalEdition = intEd;
    }
    public getInternationalEdition(): Boolean {
        return this.internationalEdition;
    }

    public setShipsOn(shipsOn: string): void {
        this.shipsOn = shipsOn;
    }
    public getShipsOn(): String {
        return this.shipsOn;
    }

    public setItemId(id: number): void {
        this.itemId = id;
    }
    public getItemId(): Number {
        return this.itemId;
    }

    public setDescription(description: string): void {
        this.description = new String(description);
    }
    public getDescription(): String {
        return this.description;
    }

}
