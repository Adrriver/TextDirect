import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { SessionService } from '../../session.service';
import {Order} from '../orders/order';
import {Observable, Subscription} from 'rxjs/Rx';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  public order: Order;
  public orders: Array<Order>;
  private subscription: Subscription;

  constructor(private sessionService: SessionService,
              private route: ActivatedRoute,
              private location: Location) {

    this.subscription = this.sessionService.getOrders().subscribe( res => {
        this.orders = res;
      },
      error => {
        alert(error);
      });
    this.sessionService.orders.asObservable().subscribe( res => this.order = res[0]);
    this.sessionService.setUserAccountInfo();
  }

  ngOnInit() {
    this.route.params.switchMap((params: Params) =>
      Observable.create(this.orders.filter(order => params['orderId'] === order.orderId)).subscribe(
        res => { console.log(res.hasOwnProperty('orderId')); this.order = res[0]; }));

  }

  public goBack(): void {
    this.location.back();
  }

}
