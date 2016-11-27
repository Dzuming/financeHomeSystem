// Exact copy except import UserService from core
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProductsService } from './products.service';
@Component({
    moduleId: module.id,
    selector: 'app-products',
    templateUrl: 'products.component.html',
    providers: [ProductsService]
})
export class ProductsComponent implements OnInit {
    private products: Array<any> = [];
    private categories: Array<any> = [];
    private errorMessage: string;
    private addProductForm: FormGroup;
    private name = new FormControl('', Validators.required);
    private category = new FormControl('', Validators.required);
    private spending = new FormControl('', Validators.required);
    public constructor(private productsService: ProductsService, private formBuilder: FormBuilder) { }
    public ngOnInit() {
        this.getProducts();
        // this.getCategory();
        this.addProductForm = this.formBuilder.group({
            Name: this.name,
            categoryListId: this.category,
            Spending: this.spending
        });
    }
    private getProducts() {
        this.productsService.getProducts()
            .subscribe(
            data => this.products = data,
            error => this.errorMessage = <any>error);
    }
    // private getCategory() {
    //     this.productsService.getCategory()
    //         .subscribe(
    //         data => this.categories = data,
    //         error => this.errorMessage = <any>error);
    // }
    private addProduct() {
        if (!this.addProductForm.value) { return; }
        this.productsService.addProducts(this.addProductForm.value)
            .subscribe(
            data => {
                this.products.push(data);
                this.addProductForm.reset();
            },
            error => this.errorMessage = <any>error);
    }
}
