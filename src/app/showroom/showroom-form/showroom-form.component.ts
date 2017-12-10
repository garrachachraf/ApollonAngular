import { Router } from '@angular/router';
import { Showroom } from '../../shared/model/showroom.model';
import { User } from './../../shared/model/user.module';
import { Artwork } from './../../shared/model/artwork.model';
import { ShowroomService } from './../shared/showroom.service';
import { Component, OnInit } from '@angular/core';
import { ArtworkService } from '../../artwork/artwork-detail/artwork.service';
import { AuthenticationService } from '../../authentication/authentication.service';

@Component({
  selector: 'app-showroom-form',
  templateUrl: './showroom-form.component.html',
  styleUrls: ['./showroom-form.component.css'],
  providers: [ArtworkService]
})
export class ShowroomFormComponent implements OnInit {
  newShowroom: any;
  myArtworks: Artwork[];
  currentUser: User;
  isAuthenticated : boolean;
  constructor(
    private showroomService: ShowroomService,
    private artworkService: ArtworkService,
    private authenticationService: AuthenticationService,
    private route:Router
  ) { }

  ngOnInit() {
    this.newShowroom={'title':null,'artWorks':[],'artist':null,'description':null};
    this.isAuthenticated = this.authenticationService.isAuth;
    this.currentUser = this.authenticationService.getToken();
    this.subscribeAuth()
    this.getMyArtworks();
  }

  getMyArtworks(){
    this.artworkService.getArtworksByArtist(this.currentUser.id).subscribe(
      res=>{
            this.myArtworks = res;
    })
  }
  addToShowroom(artwork: Artwork){
    if(!this.newShowroom.artWorks.find(x=> x.id==artwork.id)){
      this.newShowroom.artWorks.push(artwork)
    }
    this.myArtworks=this.myArtworks.filter(x=> x.id != artwork.id)
  }
  removeFromShowroom(artwork: Artwork){
    this.newShowroom.artWorks = this.newShowroom.artWorks.filter(x=> x.id != artwork.id)
    this.myArtworks.push(artwork)
  }

  saveShowroom(){
    this.showroomService.create(this.newShowroom).subscribe(
      res=>{
        console.log("showroom created");
        this.route.navigate(['profile']) //['profile/'+this.currentUser.id]
      }
    )
  }

  subscribeAuth() {
    this.authenticationService.isAuthenticated$.subscribe(
      isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
        this.currentUser=this.authenticationService.getToken();
        this.getMyArtworks();
      });
    }
}
