import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class SendsmsService {

  constructor(private http: HttpClient) { }

  sendsmstothis(telnumber: string , verifcode: string){
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa('ACec463a0ff5989b11f4a6c482a69f5d41:ff5e4917a9e385dcdb911ed033684e1c'));
    let formdata: FormData = new FormData();
    formdata.append('To',  telnumber);
    formdata.append('Body', 'Verification Code :' + verifcode);
    formdata.append('From', '+32460203412');

    this.http.post('https://api.twilio.com/2010-04-01/Accounts/ACec463a0ff5989b11f4a6c482a69f5d41/Messages',
      formdata,
      {headers: headers}).subscribe(response => {
      console.log(response);
    }, err => {
      console.log('User authentication failed!');
    });
  }

}
