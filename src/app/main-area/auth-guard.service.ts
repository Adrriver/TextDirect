import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { SessionService } from '../session.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private sessionService: SessionService, private router: Router) { }

  canActivate() : boolean {
      if (this.sessionService.isLoggedIn()) {
          return true;
      } else {
          this.router.navigate(['/']);
          return false;
      }
  }

  canActivateChild(): boolean {
      if (this.sessionService.isLoggedIn()) {
          return true;
      } else {
          this.router.navigate(['/']);
          return false;
      }
  }

}
