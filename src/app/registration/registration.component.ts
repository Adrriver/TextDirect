import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Address } from '../main-area/user-account-settings/address';
import { PaymentMethod } from '../main-area/user-account-settings/payment-method';
import { CreditFormComponent } from './credit-form/credit-form.component';
import { Subscription } from 'rxjs/Subscription';

//services
import { UserService } from '../user.service';
import { ChildServiceService } from '../child-service.service';

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
    public childFormGroup: FormGroup;
    public childSubscription: Subscription;
    public isChildValid: boolean = false;

    constructor(private formBuilder: FormBuilder, private userService: UserService, private childService: ChildServiceService) {
        this.childService.getChildForm().subscribe(form => { this.childFormGroup = form });
        this.childService.getMessage().subscribe(message => { this.isChildValid = message });
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

            firstName: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[\\w\\s]+')])),
            lastName: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]+')])),
            streetAddress: new FormControl('', Validators.required),
            identifier: new FormControl(''),
            city: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[\\w\\s]+')])),
            state: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[\\w\\s]+')])),
            zipcode: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9]{5}-[0-9]{4}|[0-9]{5}')]))

        });

        
        this.regForm = new FormGroup({

            username: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[\\w\\d]{1,12}')])),
            password: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[\\w\\d]{6,20}')])),
            emailAddress: new FormControl('', Validators.compose([Validators.required, Validators.pattern('')])),
            firstName: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z- ]+')])),
            lastName: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z- ]+')])),
            telephoneNumber: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')])),
            shippingAddress: this.shippingAddressSub,            
            pmtMethod: new FormControl('')
            
        });

          
  }   

     
    public onSubmit(registrationFormValid, paymentFormValid): void {
        console.log(registrationFormValid + " " + paymentFormValid);
        
    }


}