import { Router } from '@angular/router';
import {Injectable, ViewChild} from '@angular/core';
import {Http, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import { FormGroup } from '@angular/forms';
import {MdSnackBar} from '@angular/material';

//  local imports
import { UserAccount } from './main-area/user-account-settings/user-account';
import {OrdersComponent} from './main-area/orders/orders.component';
import {SalesComponent} from './main-area/sales/sales.component';
import {ItemsComponent} from './main-area/items/items.component';
import {TransactionHistoryComponent} from './main-area/transaction-history/transaction-history.component';



@Injectable()
export class SessionService {

     public user: Subject<UserAccount>; // ?
     public currentUser: Subject<UserAccount>;
     public paymentInfo: Object;
     @ViewChild(ItemsComponent)
     public items: ItemsComponent;
     @ViewChild(SalesComponent)
     public sales: SalesComponent;
     @ViewChild(OrdersComponent)
     public orders: OrdersComponent;
     @ViewChild(TransactionHistoryComponent)
     public transactions: TransactionHistoryComponent;
     public loggedIn: boolean;
     // TODO: employ URL field for JAX-RS URL prefix
     public baseUrl: string;
     public token: string;
     public searchParams: URLSearchParams;

    constructor(private http: Http, private router: Router, private snackBar: MdSnackBar) {
        this.user = new Subject<UserAccount>();
        this.baseUrl = 'http://localhost:8080/textdirect';
        this.loggedIn = false;
        this.token = 'text_direct_token';
        this.searchParams = new URLSearchParams();

    }

    logIn(username: string, password: string): void {

        this.searchParams.set('password', password);

        // Restlet returns account data sufficient to construct full UserAccount item to be
        // used for typical user session activity
        this.http.get(this.baseUrl + '/login/' + 'username=' + username,
                                { search: this.searchParams }).map(res => res.json()).subscribe(

          res => {

            localStorage.setItem('username_text_direct', username);
            // this.setUser(res);
            // localStorage.setItem(this.token, res.json().data.token);
            this.router.navigate(['/main-area/main-home']);
        },
          error => {
            this.snackBar.open('Invalid credentials', 'Try again!',
              { duration: 3000 });
        });

    }

    logOut(): boolean {

        this.loggedIn = false;
        this.user = null;

        this.searchParams.delete('password');

        localStorage.clear(); // ('username_text_direct');

        return true;
    }


    isLoggedIn(): boolean {
        console.log(localStorage.getItem('username_text_direct').length);
        return !(localStorage.getItem('username_text_direct').length === 0) ? true : false; // implement authentication logic

    }

    isAdmin(): boolean {
        // let result;
        return true; // this.currentUser.asObservable(). // .forEach(user => { user.isAdmin; }); // implement status logic
        // return result;
    }

    public setUser(user: Array<Object>): void {

      // Create fresh UserAccount instance
      user.forEach((index, val) => {

        switch (index) {

          case 0:

            break;

          case 1:

            break;

          case 2:

            break;

          default:

            break;

        }


      });
    }

    getUser(): Observable<UserAccount> {

        return this.user.asObservable();

    }

    createUser(regForm: FormGroup, paymentForm: FormGroup): void {
        console.log('in createUser');
        const headers = new Headers({ 'Content-Type' : 'application/json'});
        const options = new RequestOptions({ headers : headers });
        const body = JSON.stringify([{reg: regForm}, {paymentForm: paymentForm}, {isAdmin: false}]);

        this.http.post(this.baseUrl + '/create-account', body, options).subscribe((res) => {

                    const newCreds = res.json();
                    this.logIn(newCreds['username'], newCreds['password']);
                    let navResult = this.router.navigate(['/main-area/dashboard']);
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

    extractData(response): UserAccount {

      const body = response.json();

      return Object.assign(new UserAccount(), body);

    }

}
