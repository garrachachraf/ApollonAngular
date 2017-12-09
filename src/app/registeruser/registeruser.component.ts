import { Component, OnInit } from '@angular/core';
import { FormsModule , FormGroup } from '@angular/forms';
import {SendsmsService} from './shared/sendsms.service';
import {ProfileService} from '../profile/shared/profile.service';
import {User} from '../shared/model/user.module';

@Component({
  selector: 'app-registeruser',
  templateUrl: './registeruser.component.html',
  styleUrls: ['./registeruser.component.css']
})
export class RegisteruserComponent implements OnInit {

   verif = false;
   randnumber: string ;
   confirmed = false ;
   avatar: string;
  isCompleted = false ;
  constructor(private smsservice: SendsmsService , private profileservice: ProfileService) {
    this.randnumber  = '' + (Math.floor(Math.random() * (999999 - 100000)) + 100000);
    console.log(this.randnumber);
  }

  ngOnInit() {
  }

  checkthisnumber(tel: string){
    this.smsservice.sendsmstothis(tel , this.randnumber);
  }
  checkconfirmationcode(code: string){
    if (this.randnumber == code){
      return true;
    }
    return false ;
  }

  apollonavartar(val: any){
    this.avatar = JSON.parse(val).path ;
    this.isCompleted = true ;
  }

  registerhim(fname: string , lname: string , password: string ,
              email: string , address: string , role: string ,
              city: string , state: string , zip: string,
              phone: string , country: string
              ){
    const user = new User();
    user.firstname = fname ;
    user.lastname = lname;
    user.password = password;
    user.city = city ;
    user.street = address ;
    user.state = state ;
    user.email = email ;
    user.role = role ;
    user.country = country ;
    user.zipCode = zip;
    user.imagePath = this.avatar;
    user.userName = email ;

    this.profileservice.add(user).subscribe(res => {console.log(res)});
  }

  checkstep1(fname: string , lname: string , password: string ){
      if (fname.length > 3 || lname.length > 3 || password.length > 7){
        return true ;
      }
      return false ;
  }

}
