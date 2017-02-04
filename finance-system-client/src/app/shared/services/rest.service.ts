import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Product } from '../models/product.model';
@Injectable()
export class RestService {
    private errorMessage: string;
    public product: Product[];
    private productUrl: string = 'http://localhost:8081/';
    constructor(private http: Http) { }

    getProducts(filter?: String): Observable<any[]> {
        let test = this.productUrl + 'Product/';
        if (filter) {
            test = this.productUrl + 'Product/' + filter;
        }
        return this.http.get(test)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getCategory(): Observable<Product[]> {
        return this.http.get(this.productUrl + 'Category')
            .map(this.extractData)
            .catch(this.handleError);
    }
    getBudget(): Observable<any[]> {
        return this.http.get(this.productUrl + 'Budget')
            .map(this.extractData)
            .catch(this.handleError);
    }
    addProducts(product): Observable<Product> {
        let body = JSON.stringify(product);
        let headers = new Headers({
            'Content-Type': 'application/json',
        });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.productUrl + 'Product', body, options)
            .map(this.extractData)
            .catch(this.handleError);
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
