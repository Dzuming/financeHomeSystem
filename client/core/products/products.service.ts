import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class ProductsService {
    private productUrl = 'http://localhost:65443/api/Product/';
      private categoryUrl = 'http://localhost:65443/api/Category';
    constructor(private http: Http) { }
    getProducts(): Observable<any[]> {
        return this.http.get(this.productUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getCategory(): Observable<any[]> {
        return this.http.get(this.categoryUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }
    addProducts(product): Observable<any> {
        let body = JSON.stringify(product);
        console.log(body)
        let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.productUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    updateProducts(product): Observable<any[]> {
        let body = JSON.stringify(product);
        console.log(body)
        let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(`${this.productUrl}${body['id']}`, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    private extractData(res: Response) {
        let body = res.json();
        console.log(body)
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
