import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { RestService } from './rest.service';
import { Product } from '../models/product.model';
@Injectable()
export class CalculateService {
    private errorMessage: string;
    selectedData: Subject<string> = new Subject<string>();
    startingBudget: number;
    filterDate: string = this.transformDate(
        this.getMonthOrYear(new Date().getMonth() + 1),
        this.getMonthOrYear(new Date().getFullYear())
    );
    constructor(
        private http: Http,
        private restService: RestService) { }

    calculateValues(productsSpending: Product[], budget?: number): string {
        let sumofAllCosts = 0;
        if (!budget) {
            budget = 0;
        }
        productsSpending.map(value => sumofAllCosts += value.Spending);
        return (budget + sumofAllCosts).toFixed(2);
    }
    getMonthOrYear(method: number): number {
        const today = new Date();
        const date: number | string = method;
        return date;
    }
    transformDate(mm: number | string, yyyy: number | string): string {
        if (mm < 10) {
            mm = '0' + mm;
        }
        return yyyy + '-' + mm;
    }
    calculateProfitAndSpending(data: Product[]): string {
        return this.calculateValues(data);
    }
    calculateBudget(products: Product[], budget: number): string {
        return this.calculateValues(products, budget);
    }
    setData(data: string): void {
        this.selectedData.next(data);
    }
}
