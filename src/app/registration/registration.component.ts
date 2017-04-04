import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Address } from '../main-area/user-account-settings/address';
import { PaymentMethod } from '../main-area/user-account-settings/payment-method';
import { CreditFormComponent } from './credit-form/credit-form.component';
import { Subscription } from 'rxjs/Subscription';
import { UserAccount } from '../main-area/user-account-settings/user-account';

// services
import { SessionService } from '../session.service';
import { ChildServiceService } from '../child-service.service';
import {FormFeedbackDirective} from "../form-feedback.directive";

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']

})
export class RegistrationComponent implements OnInit {

    public regForm: FormGroup;
    public shippingAddressSub: FormGroup;
    public pmtArray: FormArray;
    public paymentOptions: [{}];
    public childFormGroup: FormGroup;
    public childSubscription: Subscription;
    public isChildValid = false;
    public user: UserAccount;
    public mustCorrect: boolean;


    constructor(private formBuilder: FormBuilder, private sessionService: SessionService,
                private childService: ChildServiceService) {
                    this.childService.getChildForm().subscribe(form => { this.childFormGroup = form });
                    this.childService.getMessage().subscribe(message => { this.isChildValid = message });
                    this.sessionService.getUser().subscribe(user => { this.user = user; });

    }

    ngOnInit() {


        // this.regForm = new FormGroup({});

        this.paymentOptions = [
            { value: 'default', viewValue: 'Select' },
            { value: 'credit', viewValue: 'Credit' },
            { value: 'debit', viewValue: 'Debit' },
            { value: 'check', viewValue: 'Checking Account' }
        ];

        // define nested FormGroups before insertion
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
            emailAddress: new FormControl('', Validators.compose([Validators.required, CustomValidators.email])),
            firstName: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z- ]+')])),
            lastName: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z- ]+')])),
            telephoneNumber: new FormControl('', Validators.compose([Validators.required,
                                                 Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')])),
            shippingAddress: this.shippingAddressSub,
            pmtMethod: new FormControl(''),
            standing: new FormControl(true),
            registrationDate: new FormControl(new Date(Date.now()))

        });

        if (this.user !== undefined) {
            this.regForm.controls['username'].setValue(this.user.username);
            this.regForm.controls['password'].setValue(this.user.password);
            this.regForm.controls['emailAddress'].setValue(this.user.emailAddress);
            this.regForm.controls['firstName'].setValue(this.user.firstName);
            this.regForm.controls['lastName'].setValue(this.user.lastName);
            this.regForm.controls['telephoneNumber'].setValue(this.user.telephoneNumber);

            this.shippingAddressSub.controls['firstName'].setValue(this.user.shippingAddress.firstName);
            this.shippingAddressSub.controls['lastName'].setValue(this.user.shippingAddress.lastName);
            this.shippingAddressSub.controls['streetAddress'].setValue(this.user.shippingAddress.streetAddress);
            this.shippingAddressSub.controls['identifier'].setValue(this.user.shippingAddress.identifier);
            this.shippingAddressSub.controls['city'].setValue(this.user.shippingAddress.city);
            this.shippingAddressSub.controls['state'].setValue(this.user.shippingAddress.state);
            this.shippingAddressSub.controls['zipcode'].setValue(this.user.shippingAddress.zipcode);

        }

  }


    public onSubmit(): void {
        const success = this.sessionService.createUser(this.regForm, this.childFormGroup);
        if (!success) { this.mustCorrect = true; }
    }


}
