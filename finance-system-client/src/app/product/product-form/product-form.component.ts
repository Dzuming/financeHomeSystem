import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RestService } from '../../shared/services/rest.service';
import { CalculateService } from '../../shared/services/calculate.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
    private title;
    private getUrlPath: any;
    constructor(private restService: RestService, private formBuilder: FormBuilder, private calculateService: CalculateService, private router: Router, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.buildForm();
        this.getCategory();
        this.getUrlPath = this.router.events.subscribe(() => {
            this.activatedRoute.params.subscribe(param => {
                this.getUrlPath.unsubscribe();
                this.title = param['param'];
                if (param['param'] === 'Spending') {
                } else {
                }
            });
        });
    }
    public addProduct() {
        if (!this.addProductForm.value) {
            this.buildForm();
            return;
        }
        let productsToPost = this.addProductForm.value;
        let user = JSON.parse(localStorage.getItem('User'));
        productsToPost.userId = user.id
        this.restService.addSpendings(productsToPost)
            .subscribe(
            data => {
                this.getProducts(this.calculateService.filterDate);
                this.addProductForm.reset();
            },
            error => this.errorMessage = <any>error);
    }
    private getProducts(filter) {
        this.restService.getSpendings(filter)
            .subscribe(
            data => this.restService.setProduct(data));
    }
    private getCategory() {
        this.restService.getCategory()
            .subscribe(
            data => this.categories = data,
            error => this.errorMessage = <any>error);
    }
    public buildForm(): void {
        this.addProductForm = this.formBuilder.group({
            Description: [this.formErrors.Description, [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(24)
            ]],
            categoryId: [this.formErrors.categoryId, [
                Validators.required,
            ]],
            Spending: [this.formErrors.Spending, [
                Validators.required,
            ]],
        });
        this.addProductForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged();

    }
    private errorMessage: string;
    private Profit = 0;
    private validationMessages = {
        'Description': {
            'required': 'Description is required.',
            'minlength': 'Description must be at least 4 characters long.',
            'maxlength': 'Description cannot be more than 24 characters long.'
        },
        'categoryId': {
            'required': 'Category is required.'
        },
        'Spending': {
            'required': 'Spending is required.'
        }
    };
    public onValueChanged(data?: any) {
        if (!this.addProductForm) { return; }
        const form = this.addProductForm;

        for (const field in this.formErrors) {
            if (this.formErrors.hasOwnProperty(field)) {
                this.formErrors[field] = '';
                this.checkErrorValidate(form, field);
            }
        }
    }

    public checkErrorValidate(form, field) {
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
            this.addError(control, field);
        }
    }

    public addError(control, field) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
                this.formErrors[field] += messages[key] + ' ';
            }
        }
    }
    public formErrors = {
        'Description': '',
        'categoryId': '',
        'Spending': ''
    };
    public addProductForm: FormGroup;
    public categories: Array<any> = [];
}
