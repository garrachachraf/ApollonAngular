import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/model/user.module';
import {ActivatedRoute} from '@angular/router';
import {ProfileService} from '../shared/profile.service';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-profile-details',
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute , private http: HttpClient) {
    const profileservice = new ProfileService(this.http);
    const id = this.route.snapshot.paramMap.get('id');
    if (id){

      profileservice.getOne(+id).subscribe(data => {this.user = data ;
      console.log(data)});
    }
  }

  user: User = JSON.parse(localStorage.getItem('currentUser'));
  ngOnInit() {

  }

}
