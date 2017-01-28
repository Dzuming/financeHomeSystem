import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  private formErrors = {
        'username': '',
        'password': '',
    };
  public loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }
 public buildForm(): void {
        this.loginForm = this.formBuilder.group({
            username: [this.formErrors.username, [
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
}
