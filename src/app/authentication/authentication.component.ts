import { UserService } from './../user/shared/user.service';
import { AuthenticationService } from './authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authentication',
  template: ``
})
export class AuthenticationComponent implements OnInit {

  constructor(
    private auth: AuthenticationService,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  signin(userCredentials:any) {
    this.auth.login(userCredentials)
        .subscribe(
        data => {
          console.log("you are logged in");
        },
        error => {
          console.log("error while authenticating");
        });
}

signup(user:any) {
    this.userService.add(user)
        .subscribe(
        data => {

        },
        error => {
 
        });
}
}
