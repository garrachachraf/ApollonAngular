import { AppSettings } from '../shared/appSettings';
import { Injectable } from "@angular/core";
import { Response, Http, Headers } from "@angular/http";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

    constructor(private http: Http) {
    }

    login(username: string, password: string) {
        let body = new URLSearchParams();
        body.set('login', username);
        body.set('password', password);
        return this.http.post(AppSettings.API_ENDPOINT + 'users/login', body.toString(), { headers: this.headers })
            .map(response => {
                // login successful if there's a jwt token in the response
                console.log(response);
                let token = response.headers.get("Authorization");
                console.log(token);
                let user = response.json();
                console.log(user);
                if (user && token) {
                    user.token = token;
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));

                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    getToken() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            return currentUser.token;
        }
    }
}