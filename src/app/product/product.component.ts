import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CalculateService } from '../shared/services/calculate.service';
import { RestService } from '../shared/services/rest.service';
import { ProductService } from './product.service';
import { Product } from '../shared/models/product.model';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',

})
export class ProductComponent implements OnInit {
    private description = new FormControl('', Validators.required);
    private spending = new FormControl('', Validators.required);
    private errorMessage: string;
    private Profit: number = 0;
    public addProductForm: FormGroup;
    public category = new FormControl('', Validators.required);
    public categories: Array<any> = [];
    public defaultSelectValue;
    public selectUndefinedOptionValue;
    public constructor(
        private calculateService: CalculateService,
        private restService: RestService,
        private productService: ProductService,
        private formBuilder: FormBuilder) { }
    public ngOnInit() {
        this.getProducts(this.calculateService.filterDate);
        this.getCategory();
        this.tableSort();
        this.addProductForm = this.formBuilder.group({
            Description: this.description,
            categoryId: this.category,
            Spending: this.spending,
        });

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
        if (!this.addProductForm.value) { return; }
        this.restService.addProducts(this.addProductForm.value)
            .subscribe(
            data => {
                this.getProducts(this.calculateService.filterDate);
                this.addProductForm.reset();
            },
            error => this.errorMessage = <any>error);
    }

}
