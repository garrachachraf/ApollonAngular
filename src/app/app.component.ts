import { AuthenticationService } from './authentication/authentication.service';
import { ShowroomService } from './showroom/shared/showroom.service';
import { Component, OnInit } from '@angular/core';

declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ShowroomService,AuthenticationService]
})
export class AppComponent implements OnInit{
  userCredentials = { username: "", password: "" };
  isAuthenticated : boolean=false;
  currentUser : any = null;
  constructor(
    private showroomService: ShowroomService,
    private authenticationService: AuthenticationService
  ){

  }
  ngOnInit() {
    if(this.authenticationService.getToken()){
      this.isAuthenticated = true;
      this.currentUser = this.authenticationService.getToken();
    }
    this.showroomService.getAll()
      .subscribe(result => {
      })
  }
  login(){
    this.authenticationService.login(this.userCredentials).subscribe(res =>{
      this.isAuthenticated = true;
      this.currentUser = this.authenticationService.getToken();
      this.closeModal();
    });
  }
  
  closeModal() {
    $('#loginModal').modal('hide')
  }
  logout(){
    this.authenticationService.logout();
    this.isAuthenticated = false;
    this.currentUser = null;
  }

}
