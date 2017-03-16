import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { Router } from '@angular/router';
import { Subscription } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { FormGroup, FormControl, Validator } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
  //styleUrls: ['./../../styles.css']
})
export class HomeComponent implements OnInit {

    title = 'Public Landing Page';
    public logInOutcome: string;
    public username: string;
    public password: string;
    public credentialsForm: FormGroup;

    constructor(private sessionService: SessionService, private router: Router) { }

    ngOnInit() {
       
        this.logInOutcome = "Welcome!";
        this.credentialsForm = new FormGroup({
            username: new FormControl(''),
            password: new FormControl('')
        });
    }

    public logIn(): void {

        this.username = this.credentialsForm.get('username').value;
        this.password = this.credentialsForm.get('password').value;

        if (this.sessionService.logIn(this.username, this.password)) {

            this.logInOutcome = this.username + " " + this.password;

            this.router.navigate(['main-area/main-home']);


        } else {

            this.logInOutcome = "Please check your credentials\n and try again.\n Thanks!";

        }

    }


}
