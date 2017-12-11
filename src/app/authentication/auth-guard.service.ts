import { AuthenticationService } from './authentication.service';
import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLogin();
  }

  checkLogin(): boolean {
      console.log(this.authService.getToken());
      console.log("auth guard");
    if (this.authService.getToken()) { return true; }
     this.router.navigate(['']);
    return false;
  }
  
}