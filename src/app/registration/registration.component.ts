import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Address } from '../main-area/user-account-settings/address';
import { PaymentMethod } from '../main-area/user-account-settings/payment-method';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
  //styleUrls: ['./../../styles.css']
})
export class RegistrationComponent implements OnInit {

    public regForm: FormGroup;
    public shippingAddressSub: FormGroup;
    public paymentMethodSub: FormGroup;
    public billingAddressSub: FormGroup;

    constructor(private userService: UserService) { }

    ngOnInit() {
        //define nested FormGroups before insertion
        this.shippingAddressSub = new FormGroup({

            firstName: new FormControl(''),
            lastName: new FormControl(''),
            streetNumber: new FormControl(''),
            street: new FormControl(''),
            aptNumber: new FormControl(''),
            city: new FormControl(''),
            state: new FormControl(''),
            zipcode: new FormControl(''),
            isPOBox: new FormControl(''),
            POBox: new FormControl('')

        });

        this.billingAddressSub = new FormGroup({

            firstName: new FormControl(''),
            lastName: new FormControl(''),
            streetNumber: new FormControl(''),
            street: new FormControl(''),
            aptNumber: new FormControl(''),
            city: new FormControl(''),
            state: new FormControl(''),
            zipcode: new FormControl(''),
            isPOBox: new FormControl(''),
            POBox: new FormControl('')

        });

        this.paymentMethodSub = new FormGroup({

            nameOnCard: new FormControl(''),
            lastFour: new FormControl(''),
            expirationDate: new FormControl(''),
            provider: new FormControl(''),
            billingAddress: this.billingAddressSub,
            cardSecurityCode: new FormControl('')

        });

        this.regForm = new FormGroup({

            username: new FormControl(''),
            password: new FormControl(''),
            emailAddress: new FormControl(''),
            firstName: new FormControl(''),
            lastName: new FormControl(''),
            telephoneNumber: new FormControl(''),
            shippingAddress: this.shippingAddressSub,
            paymentMethod: this.paymentMethodSub            
            
        });

            
  }

     onSubmit(registrationForm): void {
        console.log(registrationForm.username);
    }

}
