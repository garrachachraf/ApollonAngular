import { SubjectSubscriber } from 'rxjs/Subject';
import { AppSettings } from '../shared/appSettings';
import { Injectable } from "@angular/core";
import { Response, Http, Headers } from "@angular/http";
import 'rxjs/add/operator/map';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class AuthenticationService {
    private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    
    public isAuth : boolean;
    public myUSer : any;

    private userSource = new Subject<any>();
    private isAuthenticatedSource = new Subject<boolean>();
    // Observable  streams
    user$ = this.userSource.asObservable();
    isAuthenticated$ = this.isAuthenticatedSource.asObservable();
    
    constructor(private http: Http) {
    }

    login(userCredentials : any) {
        let body = new URLSearchParams();
        body.set('login', userCredentials.username);
        body.set('password', userCredentials.password);
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
                this.isAuthenticated(true);
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.isAuthenticated(false);
        this.saveUser(null);
    }

    getToken() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            return currentUser;
        }
    }

    isAuthenticated(isAuthenticated: boolean) {
        this.isAuthenticatedSource.next(isAuthenticated);
        this.isAuth = isAuthenticated;
    }

    saveUser(user: any) {
        this.userSource.next(user);
        this.myUSer = user;
    }

    // Checks if the current token is valid
    checkToken(){
        let headers = new Headers(
            {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': this.getToken().token
         });
        return this.http.post(AppSettings.API_ENDPOINT + 'users/check',null,{ headers: headers })
    }
}