import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Subject} from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from '../../../environments/environment';
@Injectable()
export class RestService {
    public product: Product[];
    public ProductBehavior: Subject<Product[]> = new Subject<Product[]>();
    private errorMessage: string;
    constructor(private http: Http) { }
    getProducts(filter?: String): Observable<any[]> {
        let products = environment.URL + 'Product/';
        if (filter) {
            products = environment.URL + 'Product/' + filter;
        }
        return this.http.get(products)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getCategory(): Observable<Product[]> {
        return this.http.get(environment.URL + 'Category')
            .map(this.extractData)
            .catch(this.handleError);
    }
    getBudget(): Observable<any[]> {
        return this.http.get(environment.URL + 'Budget')
            .map(this.extractData)
            .catch(this.handleError);
    }
    addProducts(product): Observable<Product> {
        const body = JSON.stringify(product);
        const headers = new Headers({
            'Content-Type': 'application/json',
        });
        const options = new RequestOptions({ headers: headers });
        return this.http.post(URL + 'Product', body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    private extractData(res: Response) {
        const body = res.json();
        return body || {};
    }
    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
    public setProduct (product: Product[]) {
        this.ProductBehavior.next(product)
    }
}
