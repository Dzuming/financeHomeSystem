//TODO: SCSS style
//TODO: Left Side nav with: filter date and chart type choose
//TODO: Right Side nav with icons: Current stats, month difference, trend overall budget 
//TODO: filter data by every column
//TODO: Flex layout
//TODO: Input errors
//TODO: Problem with post date - post always the same date
//TOOD: Block months with no data
//TOOD: Problem with fusion chart round
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProductService } from './product.service';

import { Observable } from 'rxjs/Observable';
@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    providers: [ProductService]
})
export class ProductComponent implements OnInit {
    private categories: Array<any> = [];
    private startingBudget: number = 0;
    private errorMessage: string;
    private addProductForm: FormGroup;
    private description = new FormControl('', Validators.required);
    private category = new FormControl('', Validators.required);
    private spending = new FormControl('', Validators.required);
    private currentBudget: string;
    private sumOfProfitAndSpending: string;
    private Profit: number = 0;
    private Spending: number = 0;
    private allProducts: Array<any> = [];
    public constructor(private productService: ProductService, private formBuilder: FormBuilder) { }
    public ngOnInit() {
        this.getProducts(this.productService.filterDate);
        this.getCategory();
        this.calculateBudget();
        this.addProductForm = this.formBuilder.group({
            Description: this.description,
            categoryId: this.category,
            Spending: this.spending,
        });
        
        
    }
    public ngDoCheck() {
        this.currentBudget = this.productService.calculateValues(this.allProducts, this.startingBudget);
        
    }
    private getProducts(filter) {
        this.productService.getProducts(filter)
            .subscribe(
            data => { this.productService.filterProducts = data 
            },
            error => this.errorMessage = <any>error,
            () => {
                this.getBudget();
                this.sumOfProfitAndSpending = this.productService.calculateValues(this.productService.filterProducts);
            });
    }
    private calculateBudget() {
        this.productService.getProducts()
            .subscribe(
            data => { this.allProducts = data 
            },
            error => this.errorMessage = <any>error,
            () => {
                this.getBudget()
            });
    }
    private getCategory() {
        this.productService.getCategory()
            .subscribe(
            data => this.categories = data,
            error => this.errorMessage = <any>error);
    }
    private getBudget() {
        this.productService.getBudget()
            .subscribe(
            data => this.startingBudget = data[0].overall,
            error => this.errorMessage = <any>error)
    }
    private addProduct() {
        if (!this.addProductForm.value) { return; }
        this.productService.addProducts(this.addProductForm.value)
            .subscribe(
            data => {
                this.getProducts(this.productService.filterDate);
                this.calculateBudget();
                this.addProductForm.reset();
            },
            error => this.errorMessage = <any>error);
    }
}
