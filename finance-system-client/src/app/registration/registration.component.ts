import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Registration } from '../shared/models/registration.model'
@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
    registration: Registration;
    registrationForm: FormGroup;
    private formErrors = {
        'Name': '',
        'Last': '',
        'Email': '',
        'Password': '',
    };
    constructor(
        private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.buildForm();
        console.log(this.registration)
    }
    buildForm(): void {
        this.registrationForm = this.formBuilder.group({
            Name: this.formBuilder.group({
                First: [Validators.minLength(4)],
                Last: [Validators.minLength(4)]
            }),
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
    addUser() {

    }
}
