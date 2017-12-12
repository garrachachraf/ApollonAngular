import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/model/user.module';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfileService} from '../shared/profile.service';
import {HttpClient} from '@angular/common/http';
import {FollowService} from '../../user/follow/follow.service';
import {ShowroomService} from '../../showroom/shared/showroom.service';
import {Showroom} from '../../shared/model/showroom.model';


@Component({
  selector: 'app-profile-details',
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileDetailsComponent implements OnInit {

  followers: User[];
  followersNbr: number;
  showrooms: Showroom[];
  constructor(private routers: Router , private route: ActivatedRoute , private http: HttpClient , private followService: FollowService , private showroomservice: ShowroomService) {
    const profileservice = new ProfileService(this.http);
    const id = this.route.snapshot.paramMap.get('id');

    if (id){

      profileservice.getOne(+id).subscribe(data => {this.user = data ;
      console.log(data); });
    }
  }

  user: User = JSON.parse(localStorage.getItem('currentUser'));
  ngOnInit() {
    this.getFollowers();
    this.getmyShowrooms();
  }

  getFollowers(){
    this.followService.getFollowings(this.user.id).subscribe(
      res => {
        this.followers = res;
      }
    );
  }

  getmyShowrooms(){
    this.showroomservice.getByArtistId(this.user.id).subscribe(
      res => {
        this.showrooms = res;
      }
    );
  }
  goTo( Id: number , link: string){
    this.routers.navigate([link + '/' + Id]);
  }

}
