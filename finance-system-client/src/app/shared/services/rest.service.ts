import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Product } from '../models/product.model';
import { Budget } from '../models/budget.model';
import { Period } from '../models/period.model';
import { Category } from '../models/category.model';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
@Injectable()
export class RestService {
    product: Product[];
    ProductBehavior: Subject<Product[]> = new Subject<Product[]>();
    private errorMessage: string;
    private user: User = JSON.parse(localStorage.getItem('User'));
    constructor(
        private http: Http) { }

    getSpendings(filter: String): Observable<any[]> {
        const spendingUrl = environment.URL + 'Spending/' + this.user.Email + '/' + filter;
        return this.http.get(spendingUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getProfits(filter: String): Observable<any[]> {
        const profitUrl = environment.URL + 'Profit/' + this.user.Email + '/' + filter;
        return this.http.get(profitUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getCategory(): Observable<Category[]> {
        return this.http.get(environment.URL + 'Category')
            .map(this.extractData)
            .catch(this.handleError);
    }
    getBudget(): Observable<Budget> {
        return this.http.get(environment.URL + 'Budget/' + this.user.Email)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getPeriod(): Observable<Period> {
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
    private extractData(res: Response): void {
        const body = res.json();
        return body || {};
    }
    private handleError(error: any): ErrorObservable {
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
    setProduct(product: Product[]): void {
        this.ProductBehavior.next(product);
    }
}
