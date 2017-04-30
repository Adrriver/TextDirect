/* based on Angular 2 Tour of Heroes Tutorial at: https://angular.io/docs/ts/latest/tutorial/toh-pt6.html */

import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { SessionService } from '../../session.service';
import {Item} from '../items/item';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  public item: Item;
  public items: Array<Item>;
  private subscription: Subscription;

  constructor(private sessionService: SessionService,
              private route: ActivatedRoute,
              private location: Location) {

      this.subscription = this.sessionService.getItems().subscribe( res => {
          this.items = res;
        },
          error => {
            alert(error);
      });
          this.sessionService.items.asObservable().subscribe( res => this.item = res[0]);
          this.sessionService.setUserAccountInfo();
  }

  ngOnInit() {
      this.route.params.switchMap((params: Params) =>
        Observable.create(this.items.filter(item => params['itemId'] === item.itemId)).subscribe(
          res => { console.log(res.hasOwnProperty('itemId')); this.item = res[0]; }));


  }

  public goBack(): void {
    this.location.back();
  }

  public deleteItem(itemId: number): void {
    console.log(this.sessionService.deleteItem(itemId));
  }

}
