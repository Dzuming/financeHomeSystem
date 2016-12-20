import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class ProductService {
    private productUrl = 'http://localhost:65443/api/';
    constructor(private http: Http) { }
    getProducts(): Observable<any[]> {
        return this.http.get(this.productUrl + 'Product')
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
        console.log(body)
        let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.productUrl + 'Product', body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    calculateBudget(productsSpending,budget: number) {
        let sumofAllCosts: number = 0;
        productsSpending.map(value => sumofAllCosts += value.spending);
            return (budget + sumofAllCosts).toFixed(2);
    }
    // TODO:  can i use pipe here
    calculateProfitAndSpending(productsSpending,args:string) {
        let sumofAllCosts: number = 0;
        productsSpending.filter(item => item.dateCreated.indexOf(args) !== -1).map(value => sumofAllCosts += value.spending);
        return sumofAllCosts.toFixed(2);
    }
    private extractData(res: Response) {
        let body = res.json();
        console.log(body)
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
