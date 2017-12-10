import { Component, OnInit } from '@angular/core';
import {AdressApiService} from "../shared/addressApi.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Http} from "@angular/http";

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {

  constructor(private http: HttpClient) { }
  key = '428e1b2fddb1fc2f01160644d5cfa920';
  ngOnInit() {
    let headers = new HttpHeaders();

    headers =headers.append("Accept","application/json");
    headers =headers.append("Accept","text/plain");
    headers =headers.append("Accept","*/*");

      this.http.get('https://battuta.medunes.net/api/country/all/?key=428e1b2fddb1fc2f01160644d5cfa920&callback=', { headers: headers , responseType:"text"}).subscribe(data => {
        console.log(data);
      });
  }
}
