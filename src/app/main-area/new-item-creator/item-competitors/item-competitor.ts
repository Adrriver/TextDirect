export class ItemCompetitor {

  public bookTitle: string;
  public secondaryTitle: string;
  public authors: string;
  public editors: string;
  public edition: number;
  public publicationDate: Date;
  public publisher: string;
  public ISBN: number;
  public MSRP: number;
  public pageCount: number;
  public internationalEdition: boolean;
  public shipsOn: Date;
  public itemId: number;
  public description: string;
  public sellerUsername: string;
  public imageUrl: string;

  // used item attributes
  public condition: string;
  public salePrice: number;
  public itemUrl: string;
  public format: string;

  public constructor(title: string, edition: number, format: string,
                        isbn: number, competitor: Object) {

    this.bookTitle = title;
    this.edition = edition;
    this.format = format;
    this.ISBN = isbn;
    this.salePrice = competitor['price'];
    this.condition = competitor['condition'];
    this.internationalEdition = competitor['intEd'];
    this.sellerUsername = competitor['vendor'];
    this.imageUrl = competitor['url'];
    this.itemUrl = competitor['producturl'];

  }

}
