import {Component, Input, OnInit} from '@angular/core';
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

  @Input()
  public order: Order;
  private username: string;

  constructor(private sessionService: SessionService, private route: ActivatedRoute, private location: Location) {

    this.username = localStorage.getItem('username_text_direct');
    console.log('Debug: ' + this.username);

  }

  ngOnInit() {
    this.route.params.switchMap((params: Params) =>
      this.sessionService.getOrder(+params['orderId'])).
        subscribe( res => { this.order = res['order']; });

  }

  public goBack(): void {
    this.location.back();
  }


}
