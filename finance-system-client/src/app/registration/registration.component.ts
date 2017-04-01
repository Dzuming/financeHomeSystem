import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
public registrationForm: FormGroup;
private formErrors = {
        'Email': '',
        'Password': '',
    };
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }
  public buildForm(): void {
        this.registrationForm = this.formBuilder.group({
            Email: [this.formErrors.Email, [
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
register() {
  
}
}
