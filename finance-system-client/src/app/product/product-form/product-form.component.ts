import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { RestService } from '../../shared/services/rest.service';
import { CalculateService } from '../../shared/services/calculate.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from '../../shared/models/category.model';
import { Product } from "app/shared/models/product.model";
@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
    @Input() categories: Category[];
    @Input() type: string;
    @Output() onAdd = new EventEmitter();
    addProductForm: FormGroup;
    formFields = {
        'Description': '',
        'categoryId': '',
        'incomeStatement': ''
    };
    private errorMessage: string;
    private validationMessages = {
        'Description': {
            'required': 'Description is required.',
            'minlength': 'Description must be at least 4 characters long.',
            'maxlength': 'Description cannot be more than 24 characters long.'
        },
        'categoryId': {
            'required': 'Category is required.'
        },
        'incomeStatement': {
            'required': 'Value is required.'
        }
    };
    constructor(
        private restService: RestService,
        private formBuilder: FormBuilder,
        private calculateService: CalculateService) { }

    ngOnInit() {
        this.buildForm();
    }
    submit(): void {
        if (!this.addProductForm.value) {
            this.buildForm();
            return;
        }
        const productsToPost = this.addProductForm.value;
        const user = JSON.parse(localStorage.getItem('User'));
        productsToPost.userId = user.id;
        productsToPost[this.type] = productsToPost.incomeStatement;
        delete productsToPost.incomeStatement;
        this.onAdd.emit(productsToPost)
        if (productsToPost) {
            this.addProductForm.reset();
        }
    }
    buildForm(): void {
        this.addProductForm = this.formBuilder.group({
            Description: [this.formFields.Description, [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(24)
            ]],
            categoryId: [this.formFields.categoryId, [
                Validators.required,
            ]],
            incomeStatement: [this.formFields.incomeStatement, [
                Validators.required,
            ]],
        })
        this.addProductForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged();

    }
    onValueChanged(data?: string): void {
        if (!this.addProductForm) { return; }
        const form = this.addProductForm;
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
