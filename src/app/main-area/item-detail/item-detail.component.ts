/* based on Angular 2 Tour of Heroes Tutorial at: https://angular.io/docs/ts/latest/tutorial/toh-pt6.html */

import {Component, Input, OnChanges, OnInit} from '@angular/core';
import 'rxjs/add/operator/switchMap';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { Location } from '@angular/common';
import { SessionService } from '../../session.service';
import {Item} from '../items/item';
import {Observable, Subject, Subscription} from 'rxjs';
import {OrderSubmissionService} from "../../order-submission.service";
import {Order} from "../orders/order";
import DateTimeFormat = Intl.DateTimeFormat;

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  public username: string;
  @Input()
  public item: Item;
  public items: Subject<[{}]>;
  private subscription: Subscription;
  public itemId: number;

  constructor(private sessionService: SessionService, private oss: OrderSubmissionService,
              private route: ActivatedRoute, private location: Location, private router: Router) {

      this.username = localStorage.getItem('username_text_direct');

  }

  /*public ngOnChanges() {
    console.log('itemId: ' + this.itemId);
    /!*this.item = <Item> *!/this.items.map(item => { item.itemId + ' ' + this.itemId); });

  }*/

  public ngOnInit() {
    this.route.params.switchMap((params: Params) =>
      this.sessionService.getItem(+params['itemId']))
                  .subscribe( res => { this.item = res['item']; });

  }

  public goBack(): void {
    this.location.back();
  }

  public addToCart(): boolean {
    return this.sessionService.addToCart(this.item);
  }

  public deleteItem(itemId: number): void {
    console.log(this.sessionService.deleteItem(itemId));
  }

  public submitOrder(item: Item): void {

    const order: Order = Object.assign(new Order(), item);
        order.title = item['bookTitle'];
        order.merchant = item['sellerUsername'];
        order.secTitle = item['secondaryTitle'];
        order.shipmentDate = <Intl.DateTimeFormat> DateTimeFormat(item['shipsOn']);
        order.actualShipDate = <Intl.DateTimeFormat> new DateTimeFormat();
        order.trackingNum = ' ';
        order.itemAccepted = 0;
        order.intlEdit = item['internationalEdition'];
        order.orderDate = new Date(Date.now()).toDateString();
        console.log('Debug (order): ');
        console.warn(order);

        let response = ' ';
          this.oss.submitOrder(order).subscribe( confirmation => {
                          response = confirmation;
                        alert(response['confirmation']);
                      this.router.navigate(['/main-area/dashboard']);
        },
          error => {
            alert(error);
          }
          );

  }

}
