import {Component, Input, OnInit} from '@angular/core';
import {Order} from './order';
import {Router} from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  @Input()
  public orders: Order[];
  @Input()
  public order: Order;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  public selectOrder(order: Order): void {
    this.order = order;
    alert('item selected');
    console.log(order);
  }

  public detailView(): void {
    this.router.navigate(['/main-area/orderDetail/', this.order.orderId]);
  }

}
