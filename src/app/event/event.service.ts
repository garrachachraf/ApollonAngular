import { Event } from './../shared/model/event.model';
import { DataService } from '../shared/data.service';
import { AppSettings } from './../shared/appSettings';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EventService extends DataService<Event>{
  constructor(http: HttpClient){
    super(http, AppSettings.API_ENDPOINT + 'events');
  }
}
