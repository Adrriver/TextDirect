import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Address } from '../main-area/user-account-settings/address';
import { PaymentMethod } from '../main-area/user-account-settings/payment-method';

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
    public paymentMethods: [{}];
    public selectedMethod: string;

    constructor(private formBuilder: FormBuilder,
                private userService: UserService) { }

    ngOnInit() {

        this.paymentMethods = [
            { value: 'credit', viewValue: 'Credit Account' },
            { value: 'deb-chk', viewValue: 'Debit or Checking' }
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
            street: new FormControl(''),
            identifier: new FormControl(''),
            city: new FormControl(''),
            state: new FormControl(''),
            zipcode: new FormControl('')           

        });

        this.paymentMethodCredit = new FormGroup({

            nameOnCard: new FormControl(''),
            lastFour: new FormControl(''),
            expirationDate: new FormControl(''),
            provider: new FormControl(''),
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
            paymentMethod: this.formBuilder.array([
                this.paymentMethodCredit])        
            
        });

            
  }

    public onSubmit(registrationForm): void {
        console.log(registrationForm.shippingAddress);
    }

    public updateBillingGrid() {
        if (this.selectedMethod !== 'credit')
            this.regForm.((<FormArray>)controls['paymentMethod']).push(this.paymentMethodCredit);
        else
            this.regForm.get('paymentMethod').setValue(this.paymentMethodCredit); 
    }   

}
