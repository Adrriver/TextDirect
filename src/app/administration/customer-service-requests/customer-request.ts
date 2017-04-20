/* Class: CustomerRequest
   Author: Adrian Rivera
   Date: 02/24/2017
   Class contains Request-Response pair
*/

export class CustomerRequest {

    private requestorUsername: String;
    private requestDate: String;
    private requestType: String;
    private transactionId: Number; //Active Order, Sale or Transaction ID
    private accusedUser: String;
    private outcome: [Boolean, String, Boolean]; // js object defining 'resolved : Boolean', 'dateResolved : String', 'refundIssued : Boolean'

    public setRequestorUsername(requestor: string): void {
        this.requestorUsername = String(requestor);
    }
    public getRequestorUsername(): String {
        return this.requestorUsername;
    }

    public setRequestDate(date: string): void {
        this.requestDate = String(date);
    }
    public getRequestDate(): String {
        return this.requestDate;
    }

    public setRequestType(type: string): void {
        this.requestType = String(type);
    }
    public getRequestType(): String {
        return this.requestType;
    }

    public setTransactionId(id: number): void {
        this.transactionId = Number(id);
    }
    public getTransactionId(): Number {
        return this.transactionId;
    }

    public setAccusedUser(accused: string): void {
        this.accusedUser = accused;
    }
    public setOutcome(outcome: string): void {
        let outcomeArray = outcome.split(",");

        this.outcome['resolved'] = Boolean(outcomeArray[0]);
        this.outcome['dateResolved'] = String(outcomeArray[1]);
        this.outcome['refundIssued'] = Boolean(outcomeArray[2]);
    }

    public getOutcome(): [Boolean, String, Boolean] {
        return this.outcome;
    }
}
