import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';;
import { Observable }     from 'rxjs/Observable';
@Injectable()
export class ProductsService {
constructor (private http: Http) {}
  getProducts (): Observable<any[]> {
    return this.http.get('/finance-system/Product')
                    .map(this.extractData)
  }
  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/