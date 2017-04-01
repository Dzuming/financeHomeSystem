import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Product } from '../models/product.model';
import { environment } from '../../../environments/environment';
@Injectable()
export class RestService {
    public product: Product[];
    public ProductBehavior: Subject<Product[]> = new Subject<Product[]>();
    private errorMessage: string;
    private user = JSON.parse(localStorage.getItem('User'));
    constructor(private http: Http) { }
    getSpendings(filter?: String): Observable<any[]> {
        let spendingUrl = environment.URL + 'Spending/' + this.user.Email + '/' + filter;
        return this.http.get(spendingUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getProfits(filter?: String): Observable<any[]> {
        let profitUrl = environment.URL + 'Profit/' + this.user.Email + '/' + filter;
        return this.http.get(profitUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getCategory(): Observable<Product[]> {
        return this.http.get(environment.URL + 'Category')
            .map(this.extractData)
            .catch(this.handleError);
    }
    getBudget(): Observable<any[]> {
        return this.http.get(environment.URL + 'Budget/' + this.user.Email)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getPeriod(): Observable<any[]> {
        return this.http.get(environment.URL + 'Period')
            .map(this.extractData)
            .catch(this.handleError);
    }
    addSpendings(product): Observable<Product> {
        const body = JSON.stringify(product);
        const headers = new Headers({
            'Content-Type': 'application/json',
        });
        const options = new RequestOptions({ headers: headers });
        return this.http.post(environment.URL + 'Spending', body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    private extractData(res: Response) {
        const body = res.json();
        return body || {};
    }
    private handleError(error: any) {
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
    public setProduct(product: Product[]) {
        this.ProductBehavior.next(product)
    }
}
