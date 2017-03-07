import { Component, OnInit } from '@angular/core';
import { SessionService } from './session.service';
import { Router } from '@angular/router';
import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Public Landing Page';
    public logInOutcome: string;
    public username: string;
    public password: string;

    constructor(private sessionService: SessionService, private router: Router) { }
    
    ngOnInit() {

        this.sessionService.logOut();
        this.logInOutcome = "Welcome!";
    }

    public logIn(): void {

        if (this.sessionService.logIn(this.username, this.password)) {

            this.logInOutcome = this.username + " " + this.password;
            
            this.router.navigate(['main-area/main-home']);
            

        } else {

            this.logInOutcome = "Please check your credentials\n and try again.\n Thanks!";

        }

    }

}
