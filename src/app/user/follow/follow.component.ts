import { User } from './../../shared/model/user.module';
import { FollowService } from './follow.service';
import { AuthenticationService } from './../../authentication/authentication.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css'],
  providers: [FollowService]
})
export class FollowComponent implements OnInit {
  @Input() artistId :number;
  isAuthenticated: boolean;
  isFollowing: boolean;
  followers: User[];
  followersNbr: number;

  constructor(
    private followService: FollowService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.isAuthenticated = this.authenticationService.isAuth;
    this.subscribeAuth();
    this.getFollow();
    this.countFollowers();
  }

  subscribeAuth() {
    this.authenticationService.isAuthenticated$.subscribe(
      isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
      });
  }

  follow(){
    this.followService.follow(this.artistId).subscribe(
      res =>{
        this.isFollowing = true;
        this.followersNbr++;
      }
    )
  }

  unfollow(){
    this.followService.unfollow(this.artistId).subscribe(
      res =>{
        this.isFollowing = false;
        this.followersNbr--;
      }
    )
  }

  countFollowers(){
    this.followService.countFollowers(this.artistId).subscribe(
      res =>{
        this.followersNbr = res
      }
    )
  }
  getFollowers(){
    this.followService.getFollowers(this.artistId).subscribe(
      res =>{
        this.followers = res
      }
    )
  }
  getFollow(){
    this.followService.getFollow(this.authenticationService.getToken().id,this.artistId).subscribe(
      res =>{
        if(res.status == 200){
          this.isFollowing = true;
        }
        else{
          this.isFollowing = false;
        }
      },
      error =>{
        this.isFollowing = false;
      }
    )
  }

}
