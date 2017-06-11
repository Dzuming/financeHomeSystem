import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { BehaviorService } from '../../shared/services/behavior.service';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  @Output() onLogin = new EventEmitter();
  formFields = {
    'Email': '',
    'Password': ''
  };
  private errorMessage: string;
  private validationMessages = {
    'Email': {
      'required': 'Description is required.',
      'minlength': 'Description must be at least 4 characters long.',
    },
    'Password': {
      'required': 'Password is required.',
      'minlength': 'Password must be at least 4 characters long.',
    }
  };
  constructor(
    private formBuilder: FormBuilder,
    private behaviorService: BehaviorService,
    private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.buildForm();
  }
  buildForm(): void {
    this.loginForm = this.formBuilder.group({
      Email: [this.formFields.Email, [
        Validators.required,
        Validators.minLength(4)
      ]],
      Password: [this.formFields.Password, [
        Validators.required,
        Validators.minLength(4)
      ]]
    });
    this.loginForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }
  login(): void {
    if (!this.loginForm.value) {
      this.buildForm();
      return;
    } else {
      this.onLogin.emit(this.loginForm.value)
      if (this.loginForm.value) {
            this.loginForm.reset();
        }
    }
  }
  onValueChanged(data?: string): void {
    if (!this.loginForm) { return; }
    const form = this.loginForm;
    for (const field in this.formFields) {
      if (this.formFields.hasOwnProperty(field)) {
        this.formFields[field] = '';
        this.checkErrorValidate(form, field);
      }
    }
  }

  checkErrorValidate(form: FormGroup, field: string): void {
    const control = form.get(field);
    if (control && control.dirty && !control.valid) {
      this.addError(control, field);
    }
  }

  addError(control: AbstractControl, field: string): void {
    const messages = this.validationMessages[field];
    for (const key in control.errors) {
      if (control.errors.hasOwnProperty(key)) {
        this.formFields[field] += messages[key] + ' ';
      }
    }
  }
}
