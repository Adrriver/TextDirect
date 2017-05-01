import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TransactionHistoryComponent} from '../transaction-history/transaction-history.component';
import {OrdersComponent} from '../orders/orders.component';
import {SalesComponent} from '../sales/sales.component';
import {ItemsComponent} from '../items/items.component';
import {SessionService} from '../../session.service';
import {UserAccount} from '../user-account-settings/user-account';
import {Subscription} from 'rxjs';
import {Item} from '../items/item';
import {Transaction} from '../transaction-history/transaction';
import {Order} from '../orders/order';
import {Sale} from '../sales/sale';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  public user: UserAccount;
  private userSubscription: Subscription;
  private itemsSubscription: Subscription;
  private ordersSubscription: Subscription;
  private salesSubscription: Subscription;
  private transactionSubscription: Subscription;
  public items: Item[];
  public sales: Sale[];
  public orders: Order[];
  public transactions: Transaction[];

  constructor(private sessionService: SessionService) {


    this.userSubscription = this.sessionService.getUser().subscribe(res => {

        console.log('User received...');
        this.user = res;
      },
      error => {
        console.log('in DashboardComponent --> sessionService.getUser call error');
      });

    this.itemsSubscription = this.sessionService.getItems().subscribe(res => {
        this.items = <Item[]> res;

      },
      error => {

      });

    this.ordersSubscription = this.sessionService.getOrders().subscribe(res => {
        this.orders = <Order[]> res;
      },
      error => {
        console.log('in DashboardComponent --> sessionService.getOrders call error');
      });

    this.salesSubscription = this.sessionService.getSales().subscribe(res => {
        this.sales = <Sale[]> res;

      },
      error => {
        console.log('in DashboardComponent --> sessionService.getSales call error');
      });

    this.transactionSubscription = this.sessionService.getTransactions().subscribe(res => {
        this.transactions = res;
      },
      error => {
        console.log('in DashboardComponent --> sessionService.getTransactions call error');
      });


    this.sessionService.setUserAccountInfo();
  }

    ngOnInit() {

   }

  public ngAfterViewInit() {
      this.sessionService.setUserAccountInfo();
  }
}
