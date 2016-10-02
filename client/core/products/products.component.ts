// Exact copy except import UserService from core
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProductsService } from './products.service';
import { Products } from './products';
@Component({
    moduleId: module.id,
    selector: 'app-products',
    templateUrl: 'products.component.html',
    providers: [ProductsService]
})
export class ProductsComponent implements OnInit {
    products: Array<any> = [];
    errorMessage: string;
    private addProductForm: FormGroup;
    private name = new FormControl("", Validators.required);
    private category = new FormControl("", Validators.required);
    private spending = new FormControl("", Validators.required);
    constructor(private productsService: ProductsService, private formBuilder: FormBuilder) { }
    ngOnInit() {
        this.getProducts();
        this.addProductForm = this.formBuilder.group({
            name: this.name,
            category: this.category,
            spending: this.spending
        });
    }
    getProducts() {
        this.productsService.getProducts()
            .subscribe(
            data => this.products = data,
            error => this.errorMessage = <any>error);
    }
    addProduct() {
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


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/