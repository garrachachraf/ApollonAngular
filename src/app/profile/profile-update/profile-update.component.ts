import { Component, OnInit } from '@angular/core';
import {AdressApiService} from '../shared/addressApi.service';
import {HttpClient} from '@angular/common/http';
import {EmailvalidationService} from '../../registeruser/shared/emailvalidation.service';
import {User} from '../../shared/model/user.module';
import {ProfileService} from '../shared/profile.service';
import {SendsmsService} from '../../registeruser/shared/sendsms.service';
declare var $ :any;

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {

  constructor(private http: HttpClient , private emailservice: EmailvalidationService , private profileservice: ProfileService , private smsservice: SendsmsService ) {
  }
  country: any ;
  states: any ;
  thumbnail = true ;
  counts = new AdressApiService(this.http);
  user = new User();
  avatar: any ;
  confirmnum = true ;
  random = '' ;
  confirmed = false ;
  ngOnInit() {


    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.counts.getcountries().subscribe(data => {
      this.country = data;
      console.log(this.country );

    });

  }
  getstates(country: any){
    this.counts.getstates(country).subscribe(data => {
      this.states = data ;
      console.log(data);

    });
  }

  apollonavartar(avatar) {
    this.thumbnail = false;
    this.avatar = avatar;
  }

  saveAdress(firstname: string , lastname: string , street: string , country: string , state: string , city: string , phone: string) {
    const user2 = new User() ;
    user2.id = this.user.id ;

    for (const obj in this.user) {
      if (obj !== 'password' && this.user[obj] !== null && this.user[obj] !== [] && obj !== 'id' && obj !== 'token' ) {
        user2[obj] = this.user[obj] ;
      }

    }
    user2.firstname = firstname ;
    user2.lastname = lastname ;
    user2.street = street ;
    if (country !== null ) {
      user2.country = country ;
      user2.state = state ;
    }

    user2.city = city;
    user2.PhoneNumber = phone ;

    this.profileservice.update(user2).subscribe(res => {console.log(res); });
    localStorage.setItem('currentUser', JSON.stringify(user2));
  }

  SaveAvatar(){
    const user2 = new User() ;
    user2.id = this.user.id ;

    for (const obj in this.user) {
      if (obj !== 'password' && this.user[obj] !== null && this.user[obj] !== [] && obj !== 'id' && obj !== 'token' ) {
        user2[obj] = this.user[obj] ;
      }
    }
    user2.imagePath =  JSON.parse(this.avatar).path ;
    user2.imagePath = 'http://127.0.0.1:18080/img/' + user2.imagePath ;
    this.profileservice.update(user2).subscribe(res => {console.log(res); });
    localStorage.setItem('currentUser', JSON.stringify(user2));
  }

  Changepass(pass: string){
    this.user.password = pass ;
    this.profileservice.update(this.user).subscribe(res => {console.log(res); });
  }

  verifynumber(num) {
    this.random = '' + Math.floor(Math.random() * (13372)) ;
    this.confirmnum = false ;
    this.smsservice.sendsmstothis(num , this.random + '');
  }

  checkconfirme(code) {
    if (code === this.random ) {
      this.confirmed = true ;
    }

  }
  goHome() {
    $("#confirmationModal").modal("hide");

  }
}
