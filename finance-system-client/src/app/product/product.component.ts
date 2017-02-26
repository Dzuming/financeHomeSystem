import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CalculateService } from '../shared/services/calculate.service';
import { RestService } from '../shared/services/rest.service';
import { ProductService } from './product.service';
import { ChartService } from '../shared/services/chart.service';
import { Product } from '../shared/models/product.model';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',

})
export class ProductComponent implements OnInit {
    private spending;
    private errorMessage: string;
    private Profit: number = 0;
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
    public formErrors = {
        'Description': '',
        'categoryId': '',
        'Spending': ''
    };
    public addProductForm: FormGroup;
    public category;
    public categories: Array<any> = [];
    public defaultSelectValue;
    public selectUndefinedOptionValue;
    public constructor(
        private calculateService: CalculateService,
        private restService: RestService,
        private productService: ProductService,
        private chartService: ChartService,
        private formBuilder: FormBuilder) { }

    public ngOnInit() {
        this.getProducts(this.calculateService.filterDate);
        this.getCategory();
        this.tableSort();
        this.buildForm();
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
    private getProducts(filter) {
        this.restService.getProducts(filter)
            .subscribe(
            (data: Product[]) => {
                this.restService.product = data;
            },
            error => this.errorMessage = <any>error,
            () => {
                this.calculateService.calculateProfitAndSpending(this.restService.product);
                this.calculateService.calculateBudget(this.restService.product, this.calculateService.startingBudget);
                this.chartService.updateChart(this.restService.product)
                this.restService.getBudget();
            });
    }
    private getCategory() {
        this.restService.getCategory()
            .subscribe(
            data => this.categories = data,
            error => this.errorMessage = <any>error);
    }
    private tableSort() {
        let table = document.querySelector('.table-striped');
        let thead = table.querySelectorAll('thead');
        let tr = [].slice.call(thead[0].rows, 0);
        let th = [].slice.call(tr[0].cells, 0);
        let isClicked;
        th.map(element => {
            element.addEventListener('click', () => {
                if (element.cellIndex >= th.length - 1) {
                    return 0;
                } else {
                    isClicked = isClicked === false ? true : false;
                    this.productService.sorting(table, element.cellIndex, isClicked);
                }
            }, true);
        });
    }
    public addProduct() {
        if (!this.addProductForm.value) {
            this.buildForm();
            return;
        }
        this.restService.addProducts(this.addProductForm.value)
            .subscribe(
            data => {
                this.getProducts(this.calculateService.filterDate);
                this.addProductForm.reset();
            },
            error => this.errorMessage = <any>error);
    }

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
}
