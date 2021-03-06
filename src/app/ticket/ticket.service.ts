import { Ticket } from './../shared/model/ticket.model';
import { DataService } from '../shared/data.service';
import { AppSettings } from './../shared/appSettings';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TicketService extends DataService<Ticket>{
  constructor(http: HttpClient){
    super(http, AppSettings.API_ENDPOINT + 'tickets');
  }
}
