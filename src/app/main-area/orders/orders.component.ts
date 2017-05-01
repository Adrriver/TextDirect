import {Component, Input, OnInit} from '@angular/core';
import {Order} from './order';
import {Router} from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  private username: string;
  @Input()
  public orders: Order[];
  public order: Order;

  constructor(private router: Router) {
    this.username = localStorage.getItem('username_text_direct');
  }

  ngOnInit() {
  }

  public selectOrder(order: Order): void {
    this.order = order;
  }

  public detailView(): void {
    console.log(this.router.navigate(['/main-area/orderDetail', this.order.orderId]));
  }


}
