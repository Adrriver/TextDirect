import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {Http, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import { FormGroup } from '@angular/forms';

//  local imports
import { UserAccount } from './main-area/user-account-settings/user-account';
import {MdSnackBar} from "@angular/material";



@Injectable()
export class SessionService {

     public user: Subject<UserAccount>;
     public currentUser: Subject<UserAccount>;
     public loggedIn: boolean;
     // TODO: employ URL field for JAX-RS URL prefix
     public baseUrl: string;
     public token: string;
     public searchParams: URLSearchParams;

    constructor(private http: Http, private router: Router, private snackBar: MdSnackBar) {
        this.user = new Subject<UserAccount>();
        this.baseUrl = 'http://localhost:8080/textdirect/create-account';
        this.loggedIn = false;
        this.token = 'text_direct_token';
        this.searchParams = new URLSearchParams();

    }

    logIn(username: string, password: string): boolean {

        this.searchParams.append('username', username);
        this.searchParams.append('password', password);

        this.http.get('uri/args here', { search: this.searchParams }).map(res => {
         localStorage.setItem(this.token, res.json().data.token);
         this.initUser();
        }).catch(error => {  return error.getMessage();
                          });
        return true;

    }

    logOut(): boolean {

        this.loggedIn = false;
        this.user = null;
        this.searchParams.delete('username');
        this.searchParams.delete('token');

        localStorage.removeItem(this.token);

        return true;
    }


    isLoggedIn(): boolean {

        return true; // implement authentication logic

    }

    isAdmin(): boolean {
        // let result;
        return true; // this.currentUser.asObservable(). // .forEach(user => { user.isAdmin; }); // implement status logic
        // return result;
    }

    getUser(): Observable<UserAccount> {

        return this.user.asObservable();

    }

    initUser(): void {

        this.searchParams.delete('password');
        this.searchParams.append('token', this.token);

        this.http.get('getuseraccounturl', { search: this.searchParams }).map(res => {
                this.currentUser.next(this.extractData(res));
          }
        ).catch(error => { console.log(error); return error; });

    }

    createUser(regForm: FormGroup, paymentForm: FormGroup): boolean {

        const headers = new Headers({ 'Content-Type' : 'application/json'});
        const options = new RequestOptions({ headers : headers });
        const body = JSON.stringify([{reg: regForm}, {paymentForm: paymentForm}]);

        this.http.put(this.baseUrl, body, options)
            .map((res) => {
                  res.json().subscribe( data => {
                    const newCreds = data.json();
                    this.logIn(newCreds['username'], newCreds['password']);
                    return this.router.navigate(['/dashboard']);
                },
                    error => {
                      console.log(error);
                      this.snackBar.open(error.toString(),
                        'Error creating user. Please contact support',
                         { duration: 5000});
                  });
            });

        return false;
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
