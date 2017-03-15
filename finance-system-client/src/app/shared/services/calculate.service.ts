import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';
import { RestService } from './rest.service';
@Injectable()
export class CalculateService {
    private errorMessage: string;
    public subjectBudget: Subject<any[]> = new Subject<any[]>();
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
        return this.calculateValues(data);
    }
    calculateBudget(product, budget) {
        return this.calculateValues(product, budget);
    }
    setBudget(budget) {
        this.subjectBudget.next(budget)
    }
}
