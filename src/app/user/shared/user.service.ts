import { AppSettings } from './../../shared/appSettings';
import { DataService } from '../../shared/data.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()
export class UserService extends DataService<any>{
    constructor(http:HttpClient){
        super(http,+AppSettings.API_ENDPOINT+"/showroom");
      }
}