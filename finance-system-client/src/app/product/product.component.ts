import { Component, OnInit, Input } from '@angular/core';
import { CalculateService } from '../shared/services/calculate.service';
import { RestService } from '../shared/services/rest.service';
import { BehaviorService } from "app/shared/services/behavior.service";
import { Product } from '../shared/models/product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Budget } from 'app/shared/models/budget.model';
import { Category } from 'app/shared/models/category.model';
@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['product.component.scss'],
})
export class ProductComponent implements OnInit {
    products: Product[];
    type: string;
    sumIncomeStatement: string;
    currentBudget: string;
    categories: Category[];
    private errorMessage: string;
    private getUrlPath: any;
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private calculateService: CalculateService,
         private behaviorService: BehaviorService,
        private restService: RestService
    ) { }

    ngOnInit() {
        this.setActiveUrl();
        this.getCategory();
        this.getIncomeStatementOnChange();
    }
    private setActiveUrl() {
        this.getUrlPath = this.router.events.subscribe(() => {
            this.activatedRoute.params.subscribe(param => {
                this.getUrlPath.unsubscribe();
                this.type = param['param'];
                this.behaviorService.setType(this.type);
                this.getIncomeStatement(this.restService.getIncomeStatement(this.calculateService.filterDate, this.type));
            })
        });
    }
    getIncomeStatementOnChange() {
        this.behaviorService.productBehavior.subscribe(
            (products: Product[]) => {
                this.products = products;
                this.sumIncomeStatement = this.calculateService.calculateIncomeStatement(products, this.type);
            }
        )
    }
    private getIncomeStatement(method: any): void {
        method
            .subscribe(
            (products: Product[]): void => {
                this.products = products
                this.sumIncomeStatement = this.calculateService.calculateIncomeStatement(products, this.type);
                this.behaviorService.setProduct(products);
                this.getBudget();
            },
            error => this.errorMessage = <any>error);
    }
    private getBudget(): void {
        this.restService.getBudget()
            .subscribe(
            (data: Budget) => this.currentBudget = data.Overall.toFixed(2),
            error => this.errorMessage = <any>error);
    }
    private getCategory(): void {
        this.restService.getCategory()
            .subscribe(
            data => this.categories = data,
            error => this.errorMessage = <any>error);
    }
    addIncomeStatement(productsToPost): void {
        this.restService.addIncomeStatement(productsToPost, this.type)
            .subscribe(
            data => {
                this.getIncomeStatement(this.restService.getIncomeStatement(this.calculateService.filterDate, this.type));
            },
            error => this.errorMessage = <any>error);
    }
}
