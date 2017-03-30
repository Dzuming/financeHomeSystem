import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
@Injectable()
export class AuthenticationService {
    public token: string;
    constructor(private http: Http, private router: Router) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(credentials): Observable<boolean> {
        const body = JSON.stringify(credentials);
        const headers = new Headers({
            'Content-Type': 'application/json',
        });
        const options = new RequestOptions({ headers: headers });
        return this.http.post(environment.URL + 'authenticate', body, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                const token = response.json() && response.json().token;
                const userId = response.json() && response.json()._id;
                const email = response.json() && response.json().Email;
                if (token) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('id_token', token);
                    localStorage.setItem('userId', userId);
                    localStorage.setItem('email', email);
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            })
            .catch(this.handleError);
    }
    loggedIn() {
        return tokenNotExpired();
    }
    logout() {
        // remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('id_token');
        this.router.navigateByUrl('/login');
    }
    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
