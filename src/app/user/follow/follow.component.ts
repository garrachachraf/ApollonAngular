import { User } from './../../shared/model/user.model';
import { AuthenticationService } from './../../authentication/authentication.service';
import { FollowService } from './follow.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css'],
  providers: [FollowService]
})
export class FollowComponent implements OnInit {
  @Input() artistId :number;
  isFollowing: boolean;
  isAuthenticated: boolean;
  followers: User[];
  followersNbr: number;

  constructor(
    private followService: FollowService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.isAuthenticated = this.authenticationService.isAuth;
    this.subscribeAuth();
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
      }
    )
  }

  unfollow(){
    this.followService.follow(this.artistId).subscribe(
      res =>{
        this.isFollowing = false
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

}
