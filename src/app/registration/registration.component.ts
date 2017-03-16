import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormGroup, FormBuilder, FormArray, FormControl, Validator } from '@angular/forms';
import { Address } from '../main-area/user-account-settings/address';
import { PaymentMethod } from '../main-area/user-account-settings/payment-method';
import { CreditFormComponent } from './credit-form/credit-form.component';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

    public regForm: FormGroup;
    public shippingAddressSub: FormGroup;
    public paymentMethodCredit: FormGroup;
    public paymentMethodCash: FormGroup;
    public billingAddressSub: FormGroup;
    public pmtArray: FormArray;
    public paymentOptions: [{}];
    public selectedOption: string;
    

    constructor(private formBuilder: FormBuilder, private userService: UserService) {


    }

    ngOnInit() {


        this.pmtArray = <FormArray>this.formBuilder.array([this.paymentMethodCredit]);
        //this.regForm = new FormGroup({});

        this.paymentOptions = [
            { value: 'default', viewValue: 'Select' },
            { value: 'credit', viewValue: 'Credit' },
            { value: 'debit', viewValue: 'Debit' },
            { value: 'check', viewValue: 'Checking Account' }
        ];

        //define nested FormGroups before insertion
        this.shippingAddressSub = new FormGroup({

            firstName: new FormControl(''),
            lastName: new FormControl(''),
            streetAddress: new FormControl(''),
            identifier: new FormControl(''),
            city: new FormControl(''),
            state: new FormControl(''),
            zipcode: new FormControl('')

        });

        this.billingAddressSub = new FormGroup({

            fullName: new FormControl(''),
            streetAddress: new FormControl(''),            
            identifier: new FormControl(''),
            city: new FormControl(''),
            state: new FormControl(''),
            zipcode: new FormControl('')           

        });

        this.paymentMethodCredit = new FormGroup({

            nameOnCard: new FormControl(''),
            lastFour: new FormControl(''),
            expirationDate: new FormControl(''),
            billingAddress: this.billingAddressSub,
            cardSecurityCode: new FormControl('')

        });

        this.paymentMethodCash = new FormGroup({

            accountHolderName: new FormControl(''),
            routingNumber: new FormControl(''),
            accountNumber: new FormControl(''),
            driverLicenseNum: new FormControl(''),
            billingAddress: this.billingAddressSub

        });


        this.regForm = new FormGroup({

            username: new FormControl(''),
            password: new FormControl(''),
            emailAddress: new FormControl(''),
            firstName: new FormControl(''),
            lastName: new FormControl(''),
            telephoneNumber: new FormControl(''),
            shippingAddress: this.shippingAddressSub,
            paymentMethod: this.pmtArray,
            pmtMethod: new FormControl('')
            
        });
          
  }


    public updatePaymentForm(): void {
        
        let method: string = this.regForm.get('pmtMethod').value;
        const formGroup = <FormArray>this.regForm.get('paymentMethod');

        switch (method) {

            case 'credit':
                formGroup.push(this.paymentMethodCredit);
                formGroup.push(this.paymentMethodCash);
                break;            
            case 'debit':
                //formGroup.push(this.paymentMethodCredit);
                break;
            case 'check':
                formGroup.push(this.paymentMethodCash);
                break;
            default:
                break;

        }
        
        this.regForm.controls['paymentMethod'].value = formGroup;
        console.log(this.regForm.controls['paymentMethod'][0] + "end ");
        
        
    }  
     
    public onSubmit(registrationForm): void {
        //console.log(registrationForm);
    }


}
