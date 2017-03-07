import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

//local imports
import { UserAccount } from './main-area/user-account-settings/user-account';

@Injectable()
export class SessionService {

    public user: Observable<UserAccount>;
    public logged: boolean;
    public url: string;
    public token: string;
     
    constructor(private http: Http) {
        //clarify URL object use
        this.logged = false;
        this.token = 'text_direct_token';
    }

    public logIn(username: string, password: string): boolean {
        let response;
        //this.http.get(/*uri/args here */)
          //  .map(response => { localStorage.setItem(this.token, response.json().data.token); response = true; })
            //.catch(error => { console.log(error); response = false; });

        return true;

    }

    public logOut(): boolean {

        this.logged = false;
        this.user = null;
        localStorage.removeItem(this.token);

        return true;
    }


    public isLoggedIn(): boolean {

        return true; //implement authentication logic

    }

    public isAdmin(): boolean {

        return false; //implement status logic

    }

    

}
