import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-payment-form',
  templateUrl: './credit-form.component.html',
  styleUrls: ['./credit-form.component.css']
})
export class CreditFormComponent /*implements OnInit*/ {

    @Input() public cardForm: FormGroup;
    @Input() public bankAcctForm: FormGroup;
  //constructor() { }

  /*ngOnInit() {
  }*/

}
