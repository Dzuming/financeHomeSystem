import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../shared/services/authentication.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    private errorMessage: string;
    private formErrors = {
        'Email': '',
        'Password': ''
    };
    constructor(
        private formBuilder: FormBuilder,
        private authenticationService: AuthenticationService,
        private router: Router) {
    }

    ngOnInit() {
        this.buildForm();
    }
    buildForm(): void {
        this.loginForm = this.formBuilder.group({
            Email: [this.formErrors.Email, [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(24)
            ]],
            Password: [this.formErrors.Password, [
                Validators.required,
            ]]
        });
    }
    login(): void {
        if (!this.loginForm.value) {
            this.buildForm();
            return;
        }
        this.authenticationService.login(this.loginForm.value)
            .subscribe(
            data => {
                if (data) {
                    this.router.navigateByUrl('product/Spending');
                }
            },
            error => this.errorMessage = <any>error);
    }
}
