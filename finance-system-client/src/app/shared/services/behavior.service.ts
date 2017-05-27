import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Product } from '../models/product.model';
@Injectable()
export class BehaviorService {
    productBehavior: Subject<Product[]> = new Subject<Product[]>();
    typeBehavior: Subject<string> = new Subject<string>();
    userBehavior: Subject<boolean> = new Subject<boolean>();
    constructor(
        private http: Http) { }

    setProduct(product: Product[]): void {
        this.productBehavior.next(product);
    }
    setType(type: string): void {
        this.typeBehavior.next(type);
    }
    setUser(type: boolean): void {
        this.userBehavior.next(type);
    }
}
