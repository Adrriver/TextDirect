import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import { FormGroup } from '@angular/forms';
import './../../node_modules/rxjs/add/operator/catch';
import './../../node_modules/rxjs/add/operator/map';

//  local imports
import { UserAccount } from './main-area/user-account-settings/user-account';


@Injectable()
export class SessionService {

     user: Subject<UserAccount>;
     currentUser: Subject<UserAccount>;
     loggedIn: boolean;
     // TODO: employ URL field for JAX-RS URL prefix
     URL: string;
     token: string;
     searchParams: URLSearchParams;

    constructor(private http: Http, private router: Router) {
        this.user = new Subject<UserAccount>();
        // URL will go here
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
        return true; //this.currentUser.asObservable(). // .forEach(user => { user.isAdmin; }); // implement status logic
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
        // TODO: create POST body containing form data
        this.http.put('POST NEW USER URL', { /*body*/ })
            .map((res) => {
                if (res.json().data === 'true') {
                    return this.router.navigate(['/']);
                }
            }).catch(error => { console.log(error); return error; });

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
