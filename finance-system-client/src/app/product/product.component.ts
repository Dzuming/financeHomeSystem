import { Component, OnInit, Input } from '@angular/core';
import { CalculateService } from '../shared/services/calculate.service';
import { RestService } from '../shared/services/rest.service';
import { ChartService } from '../shared/services/chart.service';
import { Product } from '../shared/models/product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Budget } from "app/shared/models/budget.model";
import { Category } from "app/shared/models/category.model";
@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['product.component.scss'],
})
export class ProductComponent implements OnInit {
    products: Product[];
    type: string;
    sumIncomeStatement: string;
    currentBudget: number;
    categories: Category[];
    private errorMessage: string;
    private getUrlPath: any;
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private calculateService: CalculateService,
        private restService: RestService,
        private chartService: ChartService,
    ) { }

    ngOnInit() {
        // this.restService.ProductBehavior.subscribe(
        //     (data: Product[]): Product[] => this.products = data,
        //     error => this.errorMessage = <any>error);
        this.setActiveUrl();
        this.getCategory();
    }
    private setActiveUrl() {
        this.getUrlPath = this.router.events.subscribe(() => {
            this.activatedRoute.params.subscribe(param => {
                this.getUrlPath.unsubscribe();
                this.type = param['param'];
                this.getIncomeStatement(this.restService.getIncomeStatement(this.calculateService.filterDate, this.type));
            })
        });
    }
    private getIncomeStatement(method: any): void {
        method
            .subscribe(
            (products: Product[]): void => {
                this.sumIncomeStatement = this.calculateService.calculateIncomeStatement(products, this.type);
                this.restService.setProduct(products);
                this.getBudget();
            },
            error => this.errorMessage = <any>error,
            () => {
                // this.chartService.updateChart(this.products);

            });
    }
    private getBudget(): void {
        this.restService.getBudget()
            .subscribe(
            (data: Budget) => this.currentBudget = data.Overall,
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
