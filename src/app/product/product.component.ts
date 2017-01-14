//TODO: SCSS style
//TODO: Left Side nav with: filter date and chart type choose
//TODO: Right Side nav with icons: Current stats, month difference, trend overall budget 
//TODO: filter data by every column
//TODO: Flex layout
//TODO: Input errors
//TODO: Problem with post date - post always the same date
//TOOD: Block months with no data
//TOOD: Problem with fusion chart round
// Create module foer each functionality
// check models
// profitAndSpending doesnt refresh
//TODO: Calculate budget doesnt work correct
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CalculateService } from '../shared/services/calculate.service';
import { RestService } from '../shared/services/rest.service';
import { Product } from '../shared/models/product.model';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    providers: [CalculateService, RestService]
})
export class ProductComponent implements OnInit {
    
    
    private addProductForm: FormGroup;
    private description = new FormControl('', Validators.required);
    private category = new FormControl('', Validators.required);
    private spending = new FormControl('', Validators.required);
   
    private errorMessage: string;
    private Profit: number = 0;
    private product: Product[];
    private categories: Array<any> = [];
    public constructor(private calculateService: CalculateService, private restService: RestService, private formBuilder: FormBuilder) { }
    public ngOnInit() {
        this.getProducts(this.calculateService.filterDate);
        this.getCategory();
        // this.calculateService.calculateBudget();
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
                // this.calculateService.calculateBudget();
                this.addProductForm.reset();
            },
            error => this.errorMessage = <any>error);
    }
    private getProducts(filter) {
        this.restService.getProducts(filter)
            .subscribe(
            (data: Product[]) => {
                this.product = data
                console.log(this.product, data)
            },
            error => this.errorMessage = <any>error,
            () => {
                this.calculateService.calculateProfitAndSpending(this.product);
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
