import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormGroup, FormBuilder, FormArray, FormControl, Validator } from '@angular/forms';
import { Address } from '../main-area/user-account-settings/address';
import { PaymentMethod } from '../main-area/user-account-settings/payment-method';
import { CreditFormComponent } from './credit-form/credit-form.component';


@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css'],
    
})
export class RegistrationComponent implements OnInit {

    public regForm: FormGroup;
    public shippingAddressSub: FormGroup;  
    public pmtArray: FormArray;
    public paymentOptions: [{}];


    constructor(private formBuilder: FormBuilder, private userService: UserService) {


    }

    ngOnInit() {
        
        
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

        
        this.regForm = new FormGroup({

            username: new FormControl(''),
            password: new FormControl(''),
            emailAddress: new FormControl(''),
            firstName: new FormControl(''),
            lastName: new FormControl(''),
            telephoneNumber: new FormControl(''),
            shippingAddress: this.shippingAddressSub,            
            pmtMethod: new FormControl('')
            
        });

          
  }


    public updatePaymentForm(): void {
        
        //let method: string = this.regForm.get('pmtMethod').value;
        //console.log(method);
        //const formGroup: FormArray = <FormArray>this.regForm.controls['paymentMethod'];

        //switch (method) {

        //    case 'credit':
        //        formGroup.at(0) = this.paymentMethodCredit);
        //        formGroup.push(this.paymentMethodCash);
        //        break;            
        //    case 'debit':
        //        formGroup.push(this.paymentMethodCredit);
        //        break;
        //    case 'check':
        //        formGroup.push(this.paymentMethodCash);
        //        break;
        //    default:
        //        break;

        //}

        ////formGroup);//.setValue(formGroup.value[0]);

        //(<FormArray> this.regForm.controls['paymentMethod']).at(0).setValue([formGroup]);
        //console.log((<FormArray>this.regForm.controls['paymentMethod']).controls[0].value);
        
        
    }  
     
    public onSubmit(registrationForm): void {
        //console.log(registrationForm);
    }


}
