// Exact copy except import UserService from core
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProductService } from './product.service';

import { Observable } from 'rxjs/Observable';
@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    providers: [ProductService]
})
export class ProductComponent implements OnInit {
    mode = 'Observable';
    private products: Array<any> = [];
    private productsPromises: Observable<any[]>;
    private categories: Array<any> = [];
    private startingBudget: number = 0;
    private errorMessage: string;
    private addProductForm: FormGroup;
    private description = new FormControl('', Validators.required);
    private category = new FormControl('', Validators.required);
    private spending = new FormControl('', Validators.required);
    private filterargs = "2016-12";
    private currentBudget: string;
    private sumOfProfitAndSpending: string;
    private Profit: number = 0;
    private Spending: number = 0;
    public constructor(private productsService: ProductService, private formBuilder: FormBuilder) { }
    public ngOnInit() {
        this.getProducts();
        this.getCategory();
        this.addProductForm = this.formBuilder.group({
            Description: this.description,
            categoryId: this.category,
            Spending: this.spending,
        });
    }
    public ngDoCheck() {
        this.sumOfProfitAndSpending = this.productsService.calculateProfitAndSpending(this.products,this.filterargs);
    }
    private getProducts() {
        this.productsService.getProducts()
            .subscribe(
            data => { this.products = data 
                
            },
            error => this.errorMessage = <any>error,
            () => {
                this.getBudget()
            });
    }
    private getCategory() {
        this.productsService.getCategory()
            .subscribe(
            data => this.categories = data,
            error => this.errorMessage = <any>error);
    }
    private getBudget() {
        this.productsService.getBudget()
            .subscribe(
            data => this.startingBudget = data[0].overall,
            error => this.errorMessage = <any>error,
            () => {
                this.currentBudget = this.productsService.calculateBudget(this.products, this.startingBudget);
                this.sumOfProfitAndSpending = this.productsService.calculateProfitAndSpending(this.products,this.filterargs);
            })
    }
    private addProduct() {
        if (!this.addProductForm.value) { return; }
        this.productsService.addProducts(this.addProductForm.value)
            .subscribe(
            data => {
                this.getProducts();
                this.addProductForm.reset();
            },
            error => this.errorMessage = <any>error);
    }
}
