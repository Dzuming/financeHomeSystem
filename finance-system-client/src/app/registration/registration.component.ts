import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Registration } from '../shared/models/registration.model'
import { RestService } from '../shared/services/rest.service'
@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
    registration: Registration;
    registrationForm: FormGroup;
    image:string;
    private errorMessage: string;
    private formErrors = {
        'Name': {
            'First': '',
            'Last': ''
        },
        'Last': '',
        'Email': '',
        'Password': '',
        'Image': '',
    };
    constructor(
        private restService: RestService,
        private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.buildForm();
    }
    buildForm(): void {
        this.registrationForm = this.formBuilder.group({
            Name: this.formBuilder.group({
                First: [this.formErrors.Name.First, [
                    Validators.minLength(4)
                ]],
                Last: [this.formErrors.Name.Last, [
                    Validators.minLength(4)
                ]]
            }),
            Email: [this.formErrors.Email, [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(24)
            ]],
            Password: [this.formErrors.Password, [
                Validators.required,
            ]],
            Image: [this.formErrors.Image, [
            ]]
        });

    }
    fileChange(event) {
    let fileList: FileList = event.srcElement.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        let reader  = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function() {
            let splitImg = reader.result.split(',');
            this.registrationForm.value.Image = new Buffer(splitImg[1], 'base64');
            this.registrationForm.value.Type = splitImg[0].split(/:|;/)[1];
    }.bind(this)
    reader.onerror = function() {
        console.log('there are some problems');
    }
    }
}
    addUser(): void {
        console.log(this.image)
        if (!this.registrationForm.value) {
            this.buildForm();
            return;
        }
        this.restService.addUser(this.registrationForm.value)
            .subscribe(
            data => {
                this.registrationForm.reset();
            },
            error => this.errorMessage = <any>error);
    }
}
