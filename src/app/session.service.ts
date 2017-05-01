import { Router } from '@angular/router';
import {Injectable, ViewChild} from '@angular/core';
import {Http, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import { FormGroup } from '@angular/forms';
import {MdSnackBar} from '@angular/material';

//  local imports
import { UserAccount } from './main-area/user-account-settings/user-account';
import {PaymentMethod} from './main-area/user-account-settings/payment-method';
import {Item} from './main-area/items/item';
import {Sale} from './main-area/sales/sale';
import {Order} from './main-area/orders/order';
import {Transaction} from './main-area/transaction-history/transaction';



@Injectable()
export class SessionService {

     public currentUser: Subject<UserAccount>;
     public paymentInfo: Subject<PaymentMethod>;
     public items = new Subject<Array<Item>>();
     public sales: Subject<Array<Sale>>;
     public orders: Subject<Array<Order>>;
     public transactions: Subject<Array<Transaction>>;
     public shoppingCart: Array<Item>;

     private accountInformationRaw: Object;

     public loggedIn: boolean;
     // TODO: employ URL field for JAX-RS URL prefix
     public baseUrl: string;
     public token: string;
     public searchParams: URLSearchParams;

    constructor(private http: Http, private router: Router, private snackBar: MdSnackBar) {
        this.baseUrl = 'http://localhost:8080/textdirect';
        this.loggedIn = false;
        this.token = 'text_direct_token';
        this.searchParams = new URLSearchParams();
        this.currentUser = new Subject<UserAccount>();
        this.sales = new Subject<Array<Sale>>();
        this.orders = new Subject<Array<Order>>();
        this.transactions = new Subject<Array<Transaction>>();
        this.shoppingCart = new Array<Item>();


    }

    logIn(username: string, password: string): void {

        this.searchParams.set('password', password);


        // Restlet returns account data sufficient to construct full UserAccount item to be
        // used for typical user session activity
        this.http.get(this.baseUrl + '/login/' + 'username=' + username,
                                { search: this.searchParams }).map(res => res.json()).subscribe( res => {

            this.accountInformationRaw = res;
            localStorage.setItem('username_text_direct', username);
            this.router.navigate(['/main-area/main-home']);
        },
          error => {
            this.snackBar.open(error, 'Try again!',
              { duration: 3000 });
        });

    }

    logOut(): boolean {

        this.loggedIn = false;
        this.currentUser = null;

        this.searchParams.delete('password');

        localStorage.clear(); // ('username_text_direct');

        return true;
    }


    public isLoggedIn(): boolean {
        console.log(localStorage.getItem('username_text_direct').length);
        return !(localStorage.getItem('username_text_direct').length === 0) ? true : false; // implement authentication logic

    }

    public isLogged(): void {
      if (localStorage.getItem('username_text_direct') !== null){
            this.router.navigate(['/main-area/dashboard']);
      } else {
          localStorage.removeItem('username_text_direct');
            this.router.navigate(['']);
      }
    }

    isAdmin(): boolean {
        // let result;
        return true; // this.currentUser.asObservable(). // .forEach(user => { user.isAdmin; }); // implement status logic
        // return result;
    }

    public setUserAccountInfo(): Observable<boolean> {

      if (this.accountInformationRaw === undefined) {
        return Observable.create(false); // false;
      }
      const user = this.accountInformationRaw;
      console.log(user);
      // Create fresh UserAccount instance
      const userAccount = <UserAccount> Object.assign(new UserAccount(), user[1]['UserAccount'][0]);
        this.currentUser.next(userAccount);


      const itemsArr = new Array<Item>();

        for (const item of user[3]['UserActivity']['Items']) {
            if (item.hasOwnProperty('sellerUsername')) {
              console.log('item has sellerName property')
                const it = <Item> Object.assign(new Item(), item);
                itemsArr.push(it);
            } else {
              continue;
            }
        }

      this.items.next(itemsArr);

      const ordersArr = new Array<Order>();
      for (const order of user[3]['UserActivity']['Orders']) {
        if (order.hasOwnProperty('orderId')) {
              console.log('order has orderId property')
            const ord = <Order> Object.assign(new Order(), order);
            ordersArr.push(ord);
          continue;
        } else {
        }
      }

      this.orders.next(ordersArr);

    /*  const transArr = new Array<Transaction>();
      for (const trans in user[3]['UserActivity']['Transaction']) {
          if ( trans !== undefined ) {
              const tran = Object.assign(new Transaction(), trans);
              transArr.push(tran);
                this.transactions.next(transArr);
          } else {
            continue;
          }
      }*/

      const salesArr = new Array<Sale>();
      for (const sale of user[3]['UserActivity']['Sales']) {
        if (sale.hasOwnProperty('orderId')) {
              console.log('sale has orderId property')
            const sale_ = <Sale> Object.assign(new Sale(), sale);
            salesArr.push(sale_);
        } else {
          continue;
        }
      }

      this.sales.next(salesArr);


      return Observable.create(true);

    }

    public getUser(): Observable<UserAccount> {

        return this.currentUser.asObservable();

    }


    public getItems(): Observable<Item[]> {

        return this.items.asObservable();

    }

    public getItem(itemId: number): Observable<Item> {

     return this.http.get(this.baseUrl + '/get-item?itemId=' + itemId)
       .map(response => response.json());

    }

/*      console.log(match);
        return Observable.create(match);*/



    public deleteItem(itemId: number): Observable<boolean> {

      const headers = new Headers({ 'Content-Type' : 'application/json'});
      const body = JSON.stringify({ itemId });
      const options = new RequestOptions({ headers: headers });

      options.headers.append('Authorization', localStorage.getItem('username_text_direct'));

      return this.http.delete(this.baseUrl + '/delete-item' + itemId, options).map(
        res => Observable.create(true)).catch( (err, caught) => { console.log(err + ' ' + caught);
                return Observable.create(false); });

    }

    public getOrders(): Observable<Order[]> {

        return this.orders.asObservable();

    }

    public getOrder(orderId: number): Observable<Order> {
      return this.http.get(this.baseUrl + '/get-order?orderId=' + orderId
                            + '&username=' + localStorage.getItem('username_text_direct'))
        .map( response => response.json())
        .catch(err => err.json());
    }

    public getSales(): Observable<Sale[]> {

        return this.sales.asObservable();

    }

    public getSale(saleId: number): Observable<Sale> {
      return this.http.get(this.baseUrl + '/get-sale?orderId=' + saleId
                            + '&username=' + localStorage.getItem('username_text_direct'))
        .map( response => response.json())
        .catch(err => err.json());
    }

    public getTransactions(): Observable<Transaction[]> {

        return this.transactions.asObservable();

    }



    createUser(regForm: FormGroup, paymentForm: FormGroup): void {
        console.log('in createUser');
        const headers = new Headers({ 'Content-Type' : 'application/json'});
        const options = new RequestOptions({ headers : headers });
        const body = JSON.stringify([{reg: regForm}, {paymentForm: paymentForm}, {isAdmin: false}]);

        this.http.post(this.baseUrl + '/create-account', body, options).subscribe((res) => {

                    const newCreds = res.json();
                    this.logIn(newCreds['username'], newCreds['password']);
                    const navResult = this.router.navigate(['/main-area/dashboard']);
                },
                  error => {
                    console.log(error);
                    this.snackBar.open(error.toString(),
                      'Error creating user. Please contact support',
                       { duration: 5000});
                  });
    }

    // primarily for voluntary user account updates or revisions
    updateUser(): boolean {

      this.http.put('PUT-URL', {}).map( response => {
        this.currentUser.next(this.extractData(response));
      }).catch( error => { return error.getMessage(); });

      return true;

    }

    public addToCart(item: Item): boolean {

      if(this.shoppingCart !== undefined) {
          this.shoppingCart.push(item);
            return true;
      } else {
            return false;
      }


    }

    extractData(response): UserAccount {

      const body = response.json();

      return Object.assign(new UserAccount(), body);

    }

}
