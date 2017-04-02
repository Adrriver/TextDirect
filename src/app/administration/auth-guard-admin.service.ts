import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { SessionService } from '../session.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuardAdminService implements CanActivate {

    constructor(private sessionService: SessionService, private router: Router) { }

    canActivate(): boolean {
        if (this.sessionService.isAdmin()) {
            return true;
        } else {
            this.router.navigate(['/']);
            return false;
        }
    }
    
}
