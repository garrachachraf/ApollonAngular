import { Injectable } from '@angular/core';
import {User} from "../../shared/model/user.module";
import {DataService} from "../../shared/data.service";
import {AppSettings} from "../../shared/appSettings";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ProfileService extends DataService<any> {

  constructor(http:HttpClient){
    super(http, AppSettings.API_ENDPOINT+"Profile");
  }

}
