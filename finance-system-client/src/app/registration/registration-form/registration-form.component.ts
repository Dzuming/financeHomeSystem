import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Registration } from "app/shared/models/registration.model";
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
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

  private formFields: Registration = {
    'Name': {
      'First': '',
      'Last': ''
    },
    'Email': '',
    'Password': '',
    'Image': '',
  };
  private validationMessages = {
    'Name': {
      'First': {
        'required': 'First name is required.',
        'minlength': 'First name must be at least 4 characters long.',
      },
      'Last': {
        'required': 'Last name is required.',
        'minlength': 'Last name must be at least 4 characters long.',
      }
    },
    'Email': {
      'required': 'Email is required.',
      'minlength': 'Email must be at least 4 characters long.',
    },
    'Password': {
      'required': 'Password is required.',
      'minlength': 'Password must be at least 4 characters long.',
    },
    'Image': {
    }
  };
  constructor(
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }
  buildForm(): void {
    this.registrationForm = this.formBuilder.group({
      Name: this.formBuilder.group({
        First: [this.formFields.Name.First, [
          Validators.required,
          Validators.minLength(4)
        ]],
        Last: [this.formFields.Name.Last, [
          Validators.required,
          Validators.minLength(4)
        ]]
      }),
      Email: [this.formFields.Email, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(24)
      ]],
      Password: [this.formFields.Password, [
        Validators.required,
        Validators.minLength(4)
      ]],
      Image: [this.formFields.Image, [
      ]]
    });
    this.registrationForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
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
  onValueChanged(data?: string): void {
    if (!this.registrationForm) { return; }
    const form = this.registrationForm;

    for (const field in this.formFields) {
      if (form.get(field)['controls']) {
        this.checkErrorSubfields(form, field);
      } else {

        this.checkErrorValidate(form, field);
      }
    }
  }

  checkErrorValidate(form: FormGroup, field: string): void {
    this.formFields[field] = '';
    const control = form.get(field);
    if (control && control.dirty && !control.valid) {
      this.addError(control, field);
    }
  }
  checkErrorSubfields(form: FormGroup, field: string) {
    for (const subfield in form.get(field)['controls']) {
      this.formFields[field][subfield] = '';
      const control = form.get(field)['controls'][subfield];
      if (control && control.dirty && !control.valid) {
        this.addErrorSubfield(control, field, subfield);
      }
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
  addErrorSubfield(control: AbstractControl, field: string, subfield?: string): void {
    const messages = this.validationMessages[field][subfield]
    for (const key in control.errors) {
      if (control.errors.hasOwnProperty(key)) {
        this.formFields[field][subfield] += messages[key] + ' ';

      }
    }
  }
}
