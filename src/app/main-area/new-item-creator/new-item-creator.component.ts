/* TODO: Setup all validators that require agreement with predefined attributes (from form options);
 * TODO: Handle DirectTextbook <xml> documents transferred from new-item-creator-service */

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { SessionService } from '../../session.service';
import { NewItemCreatorService } from '../../new-item-creator.service';
import {ItemCompetitorsComponent} from './item-competitors/item-competitors.component';
import {UserAccount} from '../user-account-settings/user-account';
import {coerceBooleanProperty} from '@angular/material';


@Component({
  selector: 'app-new-item-creator',
  templateUrl: './new-item-creator.component.html',
  styleUrls: ['./new-item-creator.component.css']
})


export class NewItemCreatorComponent implements OnInit {

    public itemAttributes: FormGroup;
    public conditionList: [{}];
    public shipmentDate: number;
    @ViewChild(ItemCompetitorsComponent)
    public competitorList: ItemCompetitorsComponent;
    public user: UserAccount;




    constructor(private sessionService: SessionService, private creatorService: NewItemCreatorService) {

      this.conditionList = [{ value: 'new', viewValue: 'New ()' },
                            { value: 'fine', viewValue: 'Fine ()'},
                            { value: 'vgood', viewValue: 'Very Good ()'},
                            { value: 'good', viewValue: 'Good ()'},
                            { value: 'fair', viewValue: 'Fair ()'},
                            { value: 'poor', viewValue: 'Poor ()'}
      ];

      this.sessionService.getUser().subscribe(res => { this.user = res; });


    }

    ngOnInit() {

      this.itemAttributes = new FormGroup({

          bookTitle: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[\\w\\s\]+')])),

          secondaryTitle: new FormControl('', Validators.compose([Validators.pattern('[\\w\\s\]+')])),

          authors: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[\\w\\s]+')])),

          editors: new FormControl('', Validators.compose([Validators.pattern('[\\w\\s]+')])),

          edition: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9a-bA-Z]+')])),

          publicationDate: new FormControl('', Validators.compose([Validators.required, CustomValidators.date])),

          publisher: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[\\w\\s]+')])),

          ISBN: new FormControl('', Validators.compose([Validators.required,
            Validators.pattern('(?:ISBN(?:-1[03])?:?●)?(?=[0-9X]{10}$|(?=(?:[0-9]+[-●]){3})↵[-●0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[-●]){4})[-●0-9]{17}$)(?:97[89][-●]?)?[0-9]{1,5}[-●]?[0-9]+[-●]?[0-9]+[-●]?[0-9X]$')])),

          MSRP: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^(\W)?[^\S]?[0-9]+(.)?[0-9]{2,2}$')])),

          salePrice: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^(\W)?[^\S]?[0-9]+(.)?[0-9]{2,2}$')])),
          // TODO: form option agreement
          condition: new FormControl('', Validators.compose([Validators.required])),

          internationalEdition: new FormControl('', ),

          punctualShipment: new FormControl(coerceBooleanProperty(false), Validators.compose([Validators.required, Validators.requiredTrue])),

          shipsOn: new FormControl('', Validators.compose([Validators.required, CustomValidators.date])),

        // defined by service function
          itemId: new FormControl('#?', Validators.nullValidator),

          description: new FormControl('', Validators.compose([Validators.required, Validators.minLength(50)])),
        // added automatically
          sellerUsername: new FormControl(this.user)

      });

      let response;
      this.creatorService.ajaxBook('9788193245200').subscribe((res) => {
          response = res;
      });
      // this.itemAttributes.controls['description'] = response;
      console.log(response);
    }

    public setShipmentDate() {
      const d: Date = new Date();
      this.shipmentDate = d.getUTCDate();
      this.itemAttributes.controls['shipsOn'].setValue(this.shipmentDate);
    }

    public onSubmit() {


    }

}
