import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../shared/services/authentication.service';
import { BehaviorService } from '../shared/services/behavior.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
     errorMessage: string;
    constructor(
        private behaviorService: BehaviorService,
        private authenticationService: AuthenticationService,
        private router: Router) {
    }

    ngOnInit() {
    }
    authenticateUser(loginFormValues) {
        this.authenticationService.login(loginFormValues)
      .subscribe(
      data => {
        if (data) {
          this.behaviorService.setUser(true);
          this.router.navigateByUrl('product/Spending');
        }
      },
      error => this.errorMessage = <any>error);
    }
}
