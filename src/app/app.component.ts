import { AuthenticationService } from './authentication/authentication.service';
import { ShowroomService } from './showroom/shared/showroom.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ShowroomService,AuthenticationService]
})
export class AppComponent implements OnInit{

  constructor(
    private showroomService: ShowroomService,
    private authenticationService: AuthenticationService
  ){

  }
  ngOnInit() {
    this.showroomService.getAll()
      .subscribe(result => {
      })
    this.authenticationService.login("amri04","654321").subscribe(res =>{
      console.log(res);
    });
  }
}
