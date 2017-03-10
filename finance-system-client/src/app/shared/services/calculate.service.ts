import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RestService } from './rest.service';
@Injectable()
export class CalculateService {
    private errorMessage: string;
    private sumOfProfitAndSpending: string;
    private currentBudget: string;
    public startingBudget: number;
    public filterDate: string = this.currentDate();
    constructor(private http: Http, private restService: RestService) { }
    calculateValues(productsSpending, budget?: number) {
        let sumofAllCosts = 0;
        if (!budget) {
            budget = 0;
        }
        productsSpending.map(value => sumofAllCosts += value.Spending);
        return (budget + sumofAllCosts).toFixed(2);
    }
    currentDate() {
        const today = new Date();
        let mm: number | string = today.getMonth() + 1;
        const yyyy = today.getFullYear();
        if (mm < 10) {
            mm = '0' + mm;
        }
        return yyyy + '-' + mm;
    }
    calculateProfitAndSpending(data) {
        this.sumOfProfitAndSpending = this.calculateValues(data);
    }
    calculateBudget(product, budget) {
        this.currentBudget = this.calculateValues(product, budget);
    }
}
