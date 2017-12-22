import { Component, OnInit } from '@angular/core';
import {FormsModule, FormGroup, FormControl, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {SendsmsService} from './shared/sendsms.service';
import {ProfileService} from '../profile/shared/profile.service';
import {User} from '../shared/model/user.module';
import {EmailvalidationService} from './shared/emailvalidation.service';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
declare var $ :any;
@Component({
  selector: 'app-registeruser',
  templateUrl: './registeruser.component.html',
  styleUrls: ['./registeruser.component.css'],

})
export class RegisteruserComponent implements OnInit {

  constructor(private router: Router , private profileservice: ProfileService , private fb: FormBuilder , private emailservice: EmailvalidationService   ) {
    this.rForm = fb.group({
      firstname : [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      lastname : [null, Validators.required],
      userName : [null, Validators.required],
      email : [null, Validators.required , this.checkthem.bind(this) ],
      role : [null, Validators.required],
      password : [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(32)])],
      confirmpassword : [null, Validators.compose([Validators.required])],
      validate : ''
    }, { validator: this.checkIfMatchingPasswords('password', 'confirmpassword')});
  }
  rForm: FormGroup;
  user: User;                     // A property for our submitted form
  roles: Array<string> = ['User', 'Artist' , 'GalleryOwner'];
  valid: any ;
  ngOnInit() {
    this.user = {
      userName: '',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: ''
    };
  }
  save(model: User) {
    // call API to save customer
    this.profileservice.add(model).subscribe(res => {console.log(res); });
   }


  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true});
      }
      else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }

  async checkthem(control: AbstractControl ) {
    this.valid = await this.emailservice.checke(control.value);
    return this.valid.is_valid ? null : { emailTaken: true };
  }

  goHome() {
    $("#confirmationModal").modal("hide");
        this.router.navigate(['']);
  }

}
