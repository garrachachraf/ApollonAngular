import { Component, OnInit } from '@angular/core';
import {User} from "../../shared/model/user.module";

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {

  constructor() {

  }
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  ngOnInit() {
    console.log(this.user);
  }

}
