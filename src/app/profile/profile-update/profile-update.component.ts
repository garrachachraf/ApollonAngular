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
  country: any ;
  states: any ;
  constructor(private http: HttpClient) { }
  counts = new AdressApiService(this.http);
  ngOnInit() {

    this.counts.getcountries().subscribe(data => {
      this.country= data;
      console.log(this.country );

    });

  }
  getstates(country : any){
    this.counts.getstates(country).subscribe(data => {
      this.states = data ;
      console.log(data);

    });
  }
}
