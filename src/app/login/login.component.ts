import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {AuthenticationService } from '../shared/services/authentication.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
    private errorMessage;
  private formErrors = {
        'name': '',
        'password': '',
    };
  public loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder, public authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.buildForm();
  }
 public buildForm(): void {
        this.loginForm = this.formBuilder.group({
            name: [this.formErrors.name, [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(24)
            ]],
            password: [this.formErrors.password, [
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
                console.log(data)
            },
            error => this.errorMessage = <any>error);
    }
}
