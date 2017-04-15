import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { }
    canActivate() {
        if (this.authenticationService.loggedIn()) {
            // logged in so return true
            return true;
        }
        this.router.navigateByUrl('login');
        return false;
    }
}
