/* TODO: Setup all validators that require agreement with predefined attributes (from form options);
 * TODO: Handle DirectTextbook <xml> documents transferred from new-item-creator-service */

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { SessionService } from '../../session.service';
import { NewItemCreatorService } from '../../new-item-creator.service';
import {UserAccount} from '../user-account-settings/user-account';
import {coerceBooleanProperty} from '@angular/material';
import {ItemCompetitor} from './item-competitors/item-competitor';
import {Http, Headers, RequestOptions} from '@angular/http';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router'


@Component({
  selector: 'app-new-item-creator',
  templateUrl: './new-item-creator.component.html',
  styleUrls: ['./new-item-creator.component.css']
})


export class NewItemCreatorComponent implements OnInit {

    public itemAttributes: FormGroup;
    public conditionList: [{}];
    public shipmentDate: number;
   /* @ViewChild(ItemCompetitorsComponent)*/
    public competitors: ItemCompetitor[];
    public user: UserAccount;
    public url: string;
    public requestOutcome: Object;
    public productImageUrl: string;

    constructor(private sessionService: SessionService, private creatorService: NewItemCreatorService,
                private http: Http, private snackBar: MdSnackBar, private router: Router) {

      this.url = 'http://localhost:8080/textdirect/create-new-item';
      this.conditionList = [{ value: 'new', viewValue: 'New' },
                            { value: 'fine', viewValue: 'Fine'},
                            { value: 'vgood', viewValue: 'Very Good'},
                            { value: 'good', viewValue: 'Good'},
                            { value: 'fair', viewValue: 'Fair'},
                            { value: 'poor', viewValue: 'Poor'}
      ];

    }

    ngOnInit() {

      this.itemAttributes = new FormGroup({

          quantity: new FormControl('', CustomValidators.max(10)),

          bookTitle: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[\\w\\s\\W\\S]+')])),

          secondaryTitle: new FormControl('', Validators.compose([Validators.pattern('[\\w\\s\\W\\S]+')])),

          authors: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[\\w\\s\\W\\S]+')])),

          editors: new FormControl('', Validators.compose([Validators.pattern('[\\w\\s\\W\\S]+')])),

          edition: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9a-bA-Z]+')])),

          publicationDate: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(4)])),

          publisher: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[\\w\\s\\W\\S]+')])),

          ISBN: new FormControl('', Validators.compose([Validators.required,
            Validators.pattern('(?:ISBN(?:-1[03])?:?●)?(?=[0-9X]{10}$|(?=(?:[0-9]+[-●]){3})↵[-●0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[-●]){4})[-●0-9]{17}$)(?:97[89][-●]?)?[0-9]{1,5}[-●]?[0-9]+[-●]?[0-9]+[-●]?[0-9X]$')])),

          MSRP: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^(\W)?[^\S]?[0-9]+(.)?[0-9]{2,2}$')])),

          salePrice: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^(\W)?[^\S]?[0-9]+(.)?[0-9]{2,2}$')])),
          // TODO: form option agreement
          condition: new FormControl('', Validators.compose([Validators.required])),

          internationalEdition: new FormControl(0, ),

          punctualShipment: new FormControl(coerceBooleanProperty(false), Validators.compose([Validators.required, Validators.requiredTrue])),

          shipsOn: new FormControl('', Validators.compose([Validators.required, CustomValidators.date])),

        // defined by service function
          itemId: new FormControl('', Validators.nullValidator),

          description: new FormControl('', Validators.compose([Validators.required, Validators.minLength(50)])),
        // added automatically

          sellerUsername: new FormControl('', Validators.minLength(2)),

          pageCount: new FormControl('', CustomValidators.max(999)),


      });


      this.sessionService.getUser().subscribe(res => { this.user = res;
          this.itemAttributes.controls['sellerUsername'].setValue(this.user);
      });

    }

    public isbnSearch(isbn: string): void {
      this.creatorService.ajaxBook(isbn).subscribe((res) => {
        const response = res['book'];

        this.itemAttributes.controls['bookTitle'].setValue(response['title']);
        this.itemAttributes.controls['secondaryTitle'].setValue('' /* unimplemented */);
        this.itemAttributes.controls['authors'].setValue(response['author']);
        this.itemAttributes.controls['editors'].setValue(response['editor']);
        this.itemAttributes.controls['edition'].setValue(response['edition']);
        this.itemAttributes.controls['publicationDate'].setValue(response['publicationdate']);
        this.itemAttributes.controls['publisher'].setValue(response['publisher']);
        this.itemAttributes.controls['ISBN'].setValue(response['isbn']);
        this.itemAttributes.controls['MSRP'].setValue(response['listprice']);
        this.itemAttributes.controls['pageCount'].setValue(response['pages']);
        this.productImageUrl = response['imageurl'];

        const compList: ItemCompetitor[] = [];

        for (const competitor of response['items']['item']) {
          if (competitor !== undefined) {
                const comp = new ItemCompetitor(response['title'],
                                                response['edition'],
                                                response['format'],
                                                response['isbn'],
                                                competitor);

            compList.push(comp);
          }


        }

        this.competitors = compList;

      });


    }

    // TODO: Add Edit -> Item functionality
    public checkInventory(user: UserAccount): void {


    }

    public setShipmentDate() {
      const d: Date = new Date();
      this.shipmentDate = d.getUTCDate();
      this.itemAttributes.controls['shipsOn'].setValue(this.shipmentDate);
    }

    public onSubmit() {

          const body = JSON.stringify({item: this.itemAttributes.value});
          console.log(body);
          const headers = new Headers({ 'Content-Type' : 'application/json'});
          const options = new RequestOptions({ headers: headers });

          this.http.post(this.url, body, options).subscribe(
              response => {
                  this.requestOutcome = response.json();
                  this.snackBar.open(this.requestOutcome.toString(), 'loading dashboard',
                    { duration: 5000});

                  const promise = this.router.navigate(['/main-area/dashboard']);
              },
              error => {
                  this.requestOutcome = error.json();
                  this.snackBar.open(this.requestOutcome[0], 'Please try again/report issue',
                    { duration: 4000});
                  window.moveTo(0, 0);
              });

    }

}
