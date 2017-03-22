import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import './../../../jQueryCCValidator/jquery.creditCardValidator';
import { Http } from '@angular/http';
import 'rxjs/Rx';


@Component({
  selector: 'payment-form',
  templateUrl: './credit-form.component.html',
  styleUrls: ['./credit-form.component.css']
})

    //TODO --> Implement UPS API calls in single dedicated validator; implement additional validators

export class CreditFormComponent /*implements OnInit*/ {

    @Input() public selectedMethod: string;
    public credit: FormGroup; // credit or debit card account
    public cash: FormGroup; // commonly accepted bank accounts, i.e., checking, savings
    public paymentMethods: FormGroup;
    public billingAddressSub: FormGroup;
    public regAttemptOutcome: {};
    public USPSVerify: string;
    
    constructor(private formBuilder: FormBuilder, private http: Http) {

        this.USPSVerify = 'http://production.shippingapis.com/ShippingAPI.dll?API=Verify&XML=<AddressValidateRequest USERID = "287TEXTD4274"> ';
                            

        this.paymentMethods = this.formBuilder.group({});
        
        this.billingAddressSub = new FormGroup({

            fullName: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[\\w\\-\\s\\/]+')])),
            streetAddress: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[\\w\\s]+]')])),
            identifier: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[\\w\\s]+]')])),
            city: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[\\w\\s]+]')])),
            state: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[\\w\\s]+]')])),
            zipcode: new FormControl('', Validators.compose([Validators.required, Validators.pattern('\\d+]')]))

        });

        this.credit = new FormGroup({

            nameOnCard: new FormControl('', Validators.pattern('[\\w\\-\\s\\/]+')),
            lastFour: new FormControl(''),
            expirationDate: new FormControl(''),
            billingAddress: this.billingAddressSub,
            cardSecurityCode: new FormControl('')

        });

        this.cash = new FormGroup({

            accountHolderName: new FormControl('', Validators.pattern('[\\w\\-\\s\\/]+')),
            routingNumber: new FormControl(''),
            accountNumber: new FormControl(''),
            driverLicenseNum: new FormControl(''),
            billingAddress: this.billingAddressSub

        });

        
        this.paymentMethods.addControl('credit', this.credit);
        this.paymentMethods.addControl('cash', this.cash);
        

    }

   
    //public detectCard(prefix): void {
    //    prefix.validateCreditCard(function (result) {
    //        alert('CC type: ' + result.card_type.name
    //            + '\nLength validation: ' + result.length_valid
    //            + '\nLuhn validation: ' + result.luhn_valid);
    //    });

    /* USPS API URLs
         - http://production.shippingapis.com/ShippingAPI.dll
         - https://secure.shippingapis.com/ShippingAPI.dll
    */
    public addressValidator(control) {

        let registrantAddress = this.USPSVerify +=
                                '<Address> \
                                    <Address1>${this.billingAddressSub}</Address1> \
                                        < Address2 >< /Address2> \
                                            < City > Greenbelt < /City> \
                                            < State > MD < /State> \
                                    < Zip5 > </Zip5> < Zip4 > </Zip4> \
                                < /Address> \
                            < /AddressValidateRequest>';

        if (control.value.trim().length() === 0) {
            return null;
        }

        let response = this.http.request(registrantAddress).map(response => response.json()).subscribe((response) => { response.json() }).error({});

        if(response

    }

}
