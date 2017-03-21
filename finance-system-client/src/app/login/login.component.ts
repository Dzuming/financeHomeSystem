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
    private errorMessage;
    private formErrors = {
        'Name': '',
        'Password': '',
    };
    public loginForm: FormGroup;
    constructor(private formBuilder: FormBuilder, public authenticationService: AuthenticationService, private router: Router) {
        this.authenticationService.logout();
    }

    ngOnInit() {
        this.buildForm();
    }
    public buildForm(): void {
        this.loginForm = this.formBuilder.group({
            Name: [this.formErrors.Name, [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(24)
            ]],
            Password: [this.formErrors.Password, [
                Validators.required,
            ]]
        });
        // this.loginForm.valueChanges
        //     .subscribe(data => this.onValueChanged(data));

        // this.onValueChanged();

    }
    public login() {

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
