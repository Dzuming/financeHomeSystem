import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
@Injectable()
export class AuthenticationService {
    token: string;
    constructor(
        private http: Http,
        private router: Router) { }

    login(credentials: Object): Observable<boolean> {
        const body = JSON.stringify(credentials);
        const headers = new Headers({
            'Content-Type': 'application/json',
        });
        const options = new RequestOptions({ headers: headers });
        return this.http.post(environment.URL + 'authenticate', body, options)
            .map((response: Response) => {
                const token = response.json() && response.json().token;
                const user: User = {
                    'id': response.json() && response.json()._id,
                    'Name': {
                        'First': response.json() && response.json().Name.First,
                        'Last': response.json() && response.json().Name.Last
                    },
                    'Email': response.json() && response.json().Email,
                    'Avatar': {
                        'data': response.json() && btoa(String.fromCharCode.apply(null, response.json().Avatar.data.data)),
                        'contentType': response.json() && response.json().Avatar.contentType
                    }
                };
                if (token) {
                    this.token = token;
                    localStorage.setItem('User', JSON.stringify(user));
                    localStorage.setItem('id_token', token);
                    return true;
                } else {
                    return false;
                }
            })
            .catch(this.handleError);
    }
    loggedIn(): boolean {
        return tokenNotExpired();
    }
    logout(): void {
        this.token = null;
        localStorage.removeItem('User');
        this.router.navigateByUrl('/login');
    }
    private handleError(error: any): ErrorObservable {
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
