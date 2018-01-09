import { Router } from '@angular/router';
import { AuthenticationService } from './authentication/authentication.service';
import { ShowroomService } from './showroom/shared/showroom.service';
import { Component, OnInit } from '@angular/core';
import { WishlistService } from './wishlist/shared/wishlist.service';
import { CollectionService } from './collection/collection.service';

declare var $ :any;
var OneSignal = window['OneSignal'] || [];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ShowroomService,WishlistService,CollectionService]
})
export class AppComponent implements OnInit {
  userCredentials = { username: "", password: "" };
  isAuthenticated: boolean = false;
  currentUser: any = null;
  isCorrect:boolean=true;
  constructor(
    private authenticationService: AuthenticationService,
    private router:Router
  ){}

  ngOnInit() {
    this.subscribeAuth();
    this.checkAuthentication();
  }

  login(){
    this.authenticationService.login(this.userCredentials).subscribe(
      res =>{
        res=> this.authenticationService.isAuthenticated(true);
        this.currentUser = this.authenticationService.getToken();
        this.sendTag(this.currentUser.id);
        this.closeModal("#loginModal");
        this.isCorrect = true;
        this.router.navigate(['profile']);
      },
      res=>{
        this.isCorrect = false;
        this.authenticationService.isAuthenticated(false);
      } 
    );

  }

  closeCollection(a){
    this.closeModal(a);
  }

  sendTag(userId: number){
    OneSignal.push(function() {
      console.log("sending");
      OneSignal.sendTag("userId", userId);     
    });
  }
  
  closeModal(a) {
    $(a).modal("hide");
  }

  logout(){
    this.authenticationService.logout();
  }

  // cheks if there is a valid token
  checkAuthentication(){
    if(this.authenticationService.getToken()){
      this.authenticationService.checkToken().subscribe(
        res => {
          this.isAuthenticated = true;
          this.currentUser = this.authenticationService.getToken();
          this.authenticationService.isAuthenticated(true);
        },
        error => {
          this.logout()
        }
      )
    }
  }

  openWishlist(){
    $('#wishlistModal').modal('show')
  }
  // subscribe to the isAuthenticated observable
  subscribeAuth() {
    this.authenticationService.isAuthenticated$.subscribe(
      isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
      });
    }

}
