import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator } from '@angular/forms';
import './../../../jQueryCCValidator/jquery.creditCardValidator';

@Component({
  selector: 'payment-form',
  templateUrl: './credit-form.component.html',
  styleUrls: ['./credit-form.component.css']
})

export class CreditFormComponent implements OnInit {

    @Input() cardForm: FormGroup;
    @Input() bankAcctForm: FormGroup;
    

    constructor() {}

    ngOnInit() {

        //this.cardForm = new FormGroup({});
        //this.bankAcctForm = new FormGroup({});

    }


    public detectCard(prefix): void {
        prefix.validateCreditCard(function (result) {
            alert('CC type: ' + result.card_type.name
                + '\nLength validation: ' + result.length_valid
                + '\nLuhn validation: ' + result.luhn_valid);
        });
    }

}
