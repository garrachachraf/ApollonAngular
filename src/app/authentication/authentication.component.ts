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

  signin(username: string, password: string) {
    this.auth.login(username,password)
        .subscribe(
        data => {
          console.log("you are logged in");
        },
        error => {
          console.log("error while authenticating");
        });
}

signup(user:any) {
    this.userService.create(user)
        .subscribe(
        data => {

        },
        error => {
 
        });
}
}
