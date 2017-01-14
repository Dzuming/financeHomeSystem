import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RestService } from './rest.service';
@Injectable()
export class CalculateService {
    public filterDate = this.currentDate();
    public filterProducts: Array<any>;
    private restService: RestService;
    private errorMessage: string;
    private sumOfProfitAndSpending: string;
    // public filterProductObserver = Observable.create(observer => {
    //     setTimeout(resolve => {
    //         observer.next(this.filterProducts);
    //         observer.complete();
    //     }, 500)
    // })
    // public filterDateObserver = Observable.create(observer => {
    //     setTimeout(resolve => {
    //         observer.next(this.filterDate);
    //         observer.complete();
    //     }, 500)
    // })
    constructor(private http: Http) { }
    calculateValues(productsSpending, budget?: number) {
        let sumofAllCosts: number = 0;
        if (!budget) {
            budget = 0
        }
        productsSpending.map(value => sumofAllCosts += value.spending);
        return (budget + sumofAllCosts).toFixed(2);
    }
    currentDate() {
        let today = new Date();
        let mm: number | string = today.getMonth() + 1;
        let yyyy = today.getFullYear();
        if (mm < 10) {
            mm = '0' + mm
        }
        return yyyy + '-' + mm
    }
    calculateProfitAndSpending(data){
        this.sumOfProfitAndSpending =  this.calculateValues(data)
    }
}
