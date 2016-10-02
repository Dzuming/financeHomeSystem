import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class ProductsService {
    private productUrl = '/finance-system/Product';
    constructor(private http: Http) { }
    getProducts(): Observable<any[]> {
        return this.http.get(this.productUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }
    addProducts(product): Observable<any> {
        var body = JSON.stringify(product);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        console.log(body)
        return this.http.post(this.productUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    
    private extractData(res: Response) {
        console.log(res.json())
        let body = res.json();
        return body || { };
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


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/