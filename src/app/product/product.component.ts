
//TODO: Authorization system
//TODO: Edit
//TODO: filter data by every column
//TODO: Data Input errors information
//TODO: Problem with post date - post always the same date
//TOOD: Problem with fusion chart round
// Should i Create module for each functionality
// check How to use models
//Remove and add legend in fusion charts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CalculateService } from '../shared/services/calculate.service';
import { RestService } from '../shared/services/rest.service';
import { Product } from '../shared/models/product.model';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    
})
export class ProductComponent implements OnInit {
    
    
    private addProductForm: FormGroup;
    private description = new FormControl('', Validators.required);
    private category = new FormControl('', Validators.required);
    private spending = new FormControl('', Validators.required);
   
    private errorMessage: string;
    private Profit: number = 0;
    private categories: Array<any> = [];
    public constructor(private calculateService: CalculateService, private restService: RestService, private formBuilder: FormBuilder) { }
    public ngOnInit() {
        this.getProducts(this.calculateService.filterDate);
        this.getCategory();
        this.addProductForm = this.formBuilder.group({
            Description: this.description,
            categoryId: this.category,
            Spending: this.spending,
        });


    }
     private addProduct() {
        if (!this.addProductForm.value) { return; }
        this.restService.addProducts(this.addProductForm.value)
            .subscribe(
            data => {
                this.getProducts(this.calculateService.filterDate);
                this.addProductForm.reset();
            },
            error => this.errorMessage = <any>error);
    }
    private getProducts(filter) {
        this.restService.getProducts(filter)
            .subscribe(
            (data: Product[]) => {
                this.restService.product = data
            },
            error => this.errorMessage = <any>error,
            () => {
                this.calculateService.calculateProfitAndSpending(this.restService.product);
                // this.restService.getBudget();
            });
    }
    private getCategory() {
        this.restService.getCategory()
            .subscribe(
            data => this.categories = data,
            error => this.errorMessage = <any>error);
    }
}
