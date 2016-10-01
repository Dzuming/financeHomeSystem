// Exact copy except import UserService from core
import { Component, OnInit } from '@angular/core';
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
    constructor(private productsService: ProductsService) { }
    ngOnInit() {
        this.getProducts();
}
        getProducts() {
            this.productsService.getProducts()
                .subscribe(
                data => this.products = data,
                error => this.errorMessage = <any>error);
        }

    

}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/