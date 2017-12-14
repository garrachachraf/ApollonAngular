import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Event } from '../shared/model/event.model';
import { EventService } from './event.service';
import { UserService } from './../user/shared/user.service';
import {TicketService} from '../ticket/ticket.service';
import {Ticket} from '../shared/model/ticket.model';
import {AuthenticationService} from '../authentication/authentication.service';
import {User} from '../shared/model/user.module';
import {isNull, isNullOrUndefined} from'util';

declare var $: any;

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  providers : [EventService, TicketService]
})
export class EventComponent implements OnInit {

  e: Event;
  user: User;
  pages: number[];
  events: Event[];
  tickets: Ticket[];
  eventos: Event[];
  isCreated: boolean;
  isBooked: boolean;
  isConnected: boolean;
  constructor(private eventService: EventService, private  ticketService: TicketService,    private authenticationService: AuthenticationService){
  }

  ngOnInit() {
    this.user = this.authenticationService.getToken();
    if (this.authenticationService.getToken()){
      this.authenticationService.checkToken().subscribe(
        res => {
          this.isConnected = true;
          this.authenticationService.isAuthenticated(true);
        });
    }else{
      this.isConnected = false;
    }
    this.isBooked = true;
    let tik: Ticket;
    tik = JSON.parse(localStorage.getItem('eventTicket'));
    if (!isNull(tik)){
      this.isBooked = false;
      localStorage.removeItem('eventTicket');
    }
    this.eventService.getAll().subscribe(result => this.eventos = result);
    let eve: Event;
    eve = JSON.parse(localStorage.getItem('eventCreate'));
    if (isNull(eve)) {
      this.isCreated = false;
    }else {
      this.isCreated = true;
      console.log('notnill');
        this.eventService.add(eve).subscribe(resultat => {
          console.log(resultat);
        });
        localStorage.removeItem('eventCreate');
    }
    this.allEvents();
  }

  myEvents(){
    this.user = this.authenticationService.getToken();
    this.events = this.eventos.filter(x => x.user.id === this.user.id );
  }

  allEvents(){
    this.eventService.getAll().subscribe(result => this.events = result);
  }

  upcomingEvents(){
    console.log(new Date());
    this.events = this.eventos.filter(x => x.startDate > Date.now().valueOf());
  }

  hotEvents(){
    this.events = this.eventos.filter(x => x.startDate <= Date.now().valueOf());
    this.events = this.events.filter(x => x.endDate >= Date.now().valueOf());
  }


}
