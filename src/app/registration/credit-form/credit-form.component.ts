import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validator } from '@angular/forms';
import './../../../jQueryCCValidator/jquery.creditCardValidator';

@Component({
  selector: 'payment-form',
  templateUrl: './credit-form.component.html',
  styleUrls: ['./credit-form.component.css']
})

export class CreditFormComponent /*implements OnInit*/ {

    @Input() public selectedMethod: string;
    public credit: FormGroup; // credit or debit card account
    public cash: FormGroup; // commonly accepted bank accounts, i.e., checking, savings
    public paymentMethods: FormGroup;
    public billingAddressSub: FormGroup;
    
    constructor(private formBuilder: FormBuilder /*add item-service*/) {

        this.paymentMethods = this.formBuilder.group({});
        
        this.billingAddressSub = new FormGroup({

            fullName: new FormControl(''),
            streetAddress: new FormControl(''),
            identifier: new FormControl(''),
            city: new FormControl(''),
            state: new FormControl(''),
            zipcode: new FormControl('')

        });

        this.credit = new FormGroup({

            nameOnCard: new FormControl('Reggie'),
            lastFour: new FormControl(''),
            expirationDate: new FormControl(''),
            billingAddress: this.billingAddressSub,
            cardSecurityCode: new FormControl('')

        });

        this.cash = new FormGroup({

            accountHolderName: new FormControl(''),
            routingNumber: new FormControl(''),
            accountNumber: new FormControl(''),
            driverLicenseNum: new FormControl(''),
            billingAddress: this.billingAddressSub

        });

        //this.paymentMethods.reset({ 'methods': this.formBuilder.array([]) })
        this.paymentMethods.addControl('credit', this.credit);
        this.paymentMethods.addControl('cash', this.cash);
        

    }

   // ngOnInit(){

        //this.paymentMethods = this.formBuilder.group({});

        //let array = this.formBuilder.array([]);
        //this.paymentMethods.addControl('methods', array);

        //this.billingAddressSub = new FormGroup({

        //    fullName: new FormControl(''),
        //    streetAddress: new FormControl(''),
        //    identifier: new FormControl(''),
        //    city: new FormControl(''),
        //    state: new FormControl(''),
        //    zipcode: new FormControl('')

        //});

        //this.credit = new FormGroup({

        //    nameOnCard: new FormControl('Reggie'),
        //    lastFour: new FormControl(''),
        //    expirationDate: new FormControl(''),
        //    billingAddress: this.billingAddressSub,
        //    cardSecurityCode: new FormControl('')

        //});

        //this.cash = new FormGroup({

        //    accountHolderName: new FormControl(''),
        //    routingNumber: new FormControl(''),
        //    accountNumber: new FormControl(''),
        //    driverLicenseNum: new FormControl(''),
        //    billingAddress: this.billingAddressSub

        //});

        ////this.paymentMethods.reset({ 'methods': this.formBuilder.array([]) })
         
        //this.methods = this.paymentMethods.get('methods') as FormArray;
        //this.methods.push(this.credit);
        //this.methods.push(this.cash);
        
            //console.log(this.paymentMethods.controls['methods'].value[0].controls['nameOnCard'].value);
  //  }

    
    


    //public detectCard(prefix): void {
    //    prefix.validateCreditCard(function (result) {
    //        alert('CC type: ' + result.card_type.name
    //            + '\nLength validation: ' + result.length_valid
    //            + '\nLuhn validation: ' + result.luhn_valid);
    //    });
    

}
