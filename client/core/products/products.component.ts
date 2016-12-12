// Exact copy except import UserService from core
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProductsService } from './products.service';

import { Observable } from 'rxjs/Observable';
@Component({
    moduleId: module.id,
    selector: 'app-products',
    templateUrl: 'products.component.html',
    providers: [ProductsService]
})
export class ProductsComponent implements OnInit {
    mode = 'Observable';
    private products: Array<any> = [];
    private categories: Array<any> = [];
    private errorMessage: string;
    private addProductForm: FormGroup;
    private name = new FormControl('', Validators.required);
    private category = new FormControl('', Validators.required);
    private spending = new FormControl('', Validators.required);
    private filterargs = "2016-12";
    public constructor(private productsService: ProductsService, private formBuilder: FormBuilder) { }
    public ngOnInit() {
        this.getProducts();
        this.getCategory();
        this.addProductForm = this.formBuilder.group({
            Name: this.name,
            categoryId: this.category,
            Spending: this.spending
        });
    }
    private getProducts() {
        this.productsService.getProducts()
            .subscribe(
            data => this.products = data,
            error => this.errorMessage = <any>error);
    }
    private getCategory() {
        this.productsService.getCategory()
            .subscribe(
            data => this.categories = data,
            error => this.errorMessage = <any>error);
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
    private updateProducts() {
        let productOperation: Observable<any[]>;
        if (!this.addProductForm.value) { return; }
        else {
            this.productsService.updateProducts(this.addProductForm.value)
        }

        productOperation.subscribe(
            data => this.getProducts(),
            error => this.errorMessage = <any>error);
    }
}
