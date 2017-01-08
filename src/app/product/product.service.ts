import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class ProductService {
    public filterDate = this.currentDate();
    public filterProducts: Array<any>;

    public filterProductObserver = Observable.create(observer => {
        setTimeout(resolve => {
            observer.next(this.filterProducts);
            observer.complete();
        }, 500)
    })
    public filterDateObserver = Observable.create(observer => {
        setTimeout(resolve => {
            observer.next(this.filterDate);
            observer.complete();
        }, 500)
    })
    private productUrl = 'http://localhost:65443/api/';
    constructor(private http: Http) { }
    test(): Observable<any> {
        return
    }
    getProducts(filter?: String): Observable<any[]> {
        let test = this.productUrl + 'Product';
        if (filter) {
            test = this.productUrl + 'Product/' + filter;
        }
        return this.http.get(test)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getCategory(): Observable<any[]> {
        return this.http.get(this.productUrl + 'Category')
            .map(this.extractData)
            .catch(this.handleError);
    }
    getBudget(): Observable<any[]> {
        return this.http.get(this.productUrl + 'Budget')
            .map(this.extractData)
            .catch(this.handleError);
    }
    addProducts(product): Observable<any> {
        let body = JSON.stringify(product);
        let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.productUrl + 'Product', body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
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
    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
