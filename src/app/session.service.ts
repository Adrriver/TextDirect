import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { URLSearchParams } from "@angular/http";
import { Observable, Subject } from "rxjs/Rx";
import { FormGroup } from '@angular/forms';
import "./../../node_modules/rxjs/add/operator/catch";
import "./../../node_modules/rxjs/add/operator/map";

//local imports
import { UserAccount } from "./main-area/user-account-settings/user-account";


@Injectable()
export class SessionService {

     user: Subject<UserAccount>;
     currentUser: Subject<UserAccount>;    
     logged: boolean;
     url: string;
     token: string;
     searchParams: URLSearchParams;
     
    constructor(private http: Http, private router: Router) {
        this.user = new Subject<UserAccount>();
        //clarify URL object use
        this.logged = false;
        this.token = "text_direct_token";
        
        
    }

    logIn(username: string, password: string): boolean {
        
        this.searchParams.append("username", username);
        this.searchParams.append("password", password);

        this.http.get("uri/args here", { search: this.searchParams }).map(res =>
        { localStorage.setItem(this.token, res.json().data.token); this.initUser(username); });
          //  .map(response => { localStorage.setItem(this.token, response.json().data.token); response = true; })
            //.catch(error => { console.log(error); response = false; });

        return true;

    }

    logOut(): boolean {

        this.logged = false;
        this.user = null;
        this.searchParams.delete("username");
        this.searchParams.delete("token");

        localStorage.removeItem(this.token);
        
        return true;
    }


    isLoggedIn(): boolean {

        return true; //implement authentication logic

    }

    isAdmin(): boolean {
        let result;
        this.currentUser.forEach(user => { result = user.isAdmin });//implement status logic
        return result;
    }

    getUser(): Observable<UserAccount> {

        return this.user.asObservable();

    }

    initUser(username: string): void {

        this.searchParams.delete("password");
        this.searchParams.append("token", this.token)

        this.http.get("getuseraccounturl", { search: this.searchParams }).map(res => {
                this.currentUser.next(this.extractData(res));
          }
        ).catch(error => { console.log(error); return error; });

    }

    createUser(regForm: FormGroup, paymentForm: FormGroup): boolean {

        this.http.put('POST NEW USER URL', { /*body*/ })
            .map((res) => {
                if (res.json().data === 'true') {
                    return this.router.navigate(['/'])
                } 
            }).catch(error => { console.log(error); return error; });

        return false;
    }

    //primarily for voluntary user account updates or revisions
    updateUser(): void {

        //this.http('PUT-URL' 
        
    }

    extractData(response): UserAccount{
        let body = response.json();

        return Object.assign(new UserAccount(), response);

    }

} 
