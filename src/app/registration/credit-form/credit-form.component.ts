import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';


@Component({
  selector: 'payment-form',
  templateUrl: './credit-form.component.html',
  styleUrls: ['./credit-form.component.css']
})

    //TODO --> Implement UPS API calls in single dedicated validator; implement additional validators

export class CreditFormComponent implements AfterViewInit {

    @Input() public selectedMethod: string;
    @Input() public parentForm: FormGroup;
    public credit: FormGroup; // credit or debit card account
    public cash: FormGroup; // commonly accepted bank accounts, i.e., checking, savings
    public paymentMethods: FormGroup;
    public billingAddressSubCredit: FormGroup;
    public billingAddressSubCash: FormGroup;
    public regAttemptOutcome: {};
    public USPSVerify: string;
    public zipCode: string = "";
    
    constructor(private formBuilder: FormBuilder, private http: Http) {

        this.USPSVerify = 'http://production.shippingapis.com/ShippingAPI.dll';
                            

        this.paymentMethods = this.formBuilder.group({});
        
        this.billingAddressSubCredit = new FormGroup({

            fullName: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[\\w\\-\\s\\/]+')])),
            streetAddress: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[\\w\\s\\/]+')])),
            identifier: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[\\w\\s]+')])),
            city: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[\\w\\s]+')])),
            state: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[\\w\\s]+')])),
            zipcode: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9]{5}-[0-9]{4}|[0-9]{5}')]))

        }, this.addressValidator.bind(this) );

        this.billingAddressSubCash = new FormGroup({

            fullName: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[\\w\\-\\s\\/]+')])),
            streetAddress: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[\\w\\s\\/]+')])),
            identifier: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[\\w\\s]+')])),
            city: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[\\w\\s]+')])),
            state: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[\\w\\s]+')])),
            zipcode: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9]{5}-[0-9]{4}|[0-9]{5}')]))

        }, this.addressValidator.bind(this));


        this.credit = new FormGroup({

            nameOnCard: new FormControl('', Validators.pattern('[\\w\\-\\s\\/]+')),
            lastFour: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9\s]{19}|[0-9]{16}')])),
            expirationDate: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9]{2}/[0-9]{4}')])),
            billingAddress: this.billingAddressSubCredit,
            cardSecurityCode: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9]{3}')]))

        });

        this.cash = new FormGroup({

            accountHolderName: new FormControl('', Validators.pattern('[\\w\\-\\s\\/]+')),
            routingNumber: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9]{9}')])),
            accountNumber: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9]{9,15}')])),
            driverLicenseNum: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9]{8,16}')])),
            billingAddress: this.billingAddressSubCash

        });

        
        this.paymentMethods.addControl('credit', this.credit);
        this.paymentMethods.addControl('cash', this.cash);


    }

    public ngAfterViewInit() {
        

    }


    public getChild(): FormGroup {

        return this.paymentMethods;
        
    }


    public detectcard(): void {
        this.credit.controls['lastFour'].value.validatecreditcard(function (result) {
            alert('cc type: ' + result.card_type.name
                + '\nlength validation: ' + result.length_valid
                + '\nluhn validation: ' + result.luhn_valid);
        });
    }


    public addressValidator(group: FormGroup) {

        //let response: {};

        //console.log(group);

        //if (this.zipCode.length < 5) {
        //    console.log("zipCode's length: " + this.zipCode);
        //    return null;
        //}
        //console.log("street address: " + group.controls["streetAddress"].value.toString());
        //let XmlParser = new DOMParser();
        //let XmlSerializer = new XMLSerializer();
        //let xml = XmlParser.parseFromString("< AddressValidateRequest USERID=\"287TEXTD4274\"> \
        //                                        <FirmName /> \
        //                                            < Address ID= \"0\" /> \
        //                                                <Address1>" + group.controls["identifier"].value.toString() + "</Address1> \
        //                                                    < Address2 >" + group.controls["streetAddress"].value.toString() + "< /Address2> \
        //                                                        < City >" + group.controls["city"].value.toString() + "< /City> \
        //                                                    < State >" + group.controls["state"].value.toString() + "< /State> \
        //                                                < Zip5 >" + group.controls["zipcode"].value.toString() + "<Zip5> \
        //                                            < Zip4 ></Zip4> \
        //                                        < /Address> \
        //                                     < /AddressValidateRequest>", 'text/xml');


              
        //let requestData: any = new FormData();
        //let xhr = new XMLHttpRequest();
        //requestData.append('API', 'Verify');
        //requestData.append('XML', XmlSerializer.serializeToString(xml));        
        //xhr.open("GET", this.USPSVerify, true);
        //xhr.setRequestHeader("Access-Control-Allow-Origin", 'http://66.190.140.47:4201/registration');
        //xhr.setRequestHeader("Content-Type", 'text/xml');

        //xhr.onreadystatechange = (ev) => {
        //    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        //        console.log(xhr.responseXML);
        //        return true;
        //    } else {
        //        console.log(xhr.responseText)
        //        return false;
        //    }
        //};

        //xhr.send(requestData);
        
    }

    public isValid(pmtMethod, control) {
        if (pmtMethod === 'credit')

            return this.billingAddressSubCredit.controls[control].status === 'VALID';

        else
            return this.billingAddressSubCash.controls[control].status === 'VALID';        

    }

    public onSubmit(formGroup) {
        console.log(formGroup);
    }
}
