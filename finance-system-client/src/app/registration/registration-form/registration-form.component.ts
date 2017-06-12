import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Registration } from "app/shared/models/registration.model";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  @Output() onAdd = new EventEmitter();
  registration: Registration;
  registrationForm: FormGroup;
  image: string;
  
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
    const fileList: FileList = event.srcElement.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        const splitImg = reader.result.split(',');
        this.registrationForm.value.Image = new Buffer(splitImg[1], 'base64');
        this.registrationForm.value.Type = splitImg[0].split(/:|;/)[1];
      }.bind(this)
      reader.onerror = function () {
        console.log('there are some problems');
      }
    }
  }
  addUser(): void {
    if (!this.registrationForm.value) {
      this.buildForm();
      return;
    }
    this.onAdd.emit(this.registrationForm.value)
    this.registrationForm.reset();
   
  }
}
