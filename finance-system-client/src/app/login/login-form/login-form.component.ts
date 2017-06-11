import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { BehaviorService } from '../../shared/services/behavior.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  @Output() onLogin = new EventEmitter();
  private formErrors = {
    'Email': '',
    'Password': ''
  };
  constructor(
    private formBuilder: FormBuilder,
    private behaviorService: BehaviorService,
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
    } else {
      this.onLogin.emit(this.loginForm.value)
    }

  }
}
