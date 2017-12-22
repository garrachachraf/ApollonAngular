import { User } from './../../shared/model/user.module';
import {Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, Injector} from '@angular/core';
import { Event } from '../../shared/model/event.model';
import { EventService } from './../event.service';
import { AuthenticationService } from '../../authentication/authentication.service';
import {Ticket} from '../../shared/model/ticket.model';
import {TicketService} from '../../ticket/ticket.service';
import {ProfileService} from '../../profile/shared/profile.service';
import {BrowserModule} from '@angular/platform-browser';
import {Router} from "@angular/router";

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css'],
  providers : [EventService, TicketService]
})
export class EventDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('progress') prog: ElementRef;
  @Input() event: Event;
  user: User;
  tickets: Ticket[];
  isDeleted: boolean;
  percentage: number;
  solded: number;
  constructor(
    private eventService: EventService,
    private ticketService: TicketService,
    private authenticationService: AuthenticationService,
    private profileService: ProfileService,
    private router: Router,
    private injector: Injector
  ) { }

  ngOnInit() {
    this.router = this.injector.get(Router);
    this.isDeleted = false;
    this.user = this.authenticationService.getToken();

  }

  ngAfterViewInit(){
    this.prog.nativeElement.style = 'width:' + (((this.solded * 100) / this.event.capacity)) + '%';
  }

  check(){
    this.ticketService.getAll().subscribe(res => this.tickets = res);
    this.solded = this.tickets.filter(y => y.event.id === this.event.id).length;
    console.log(this.solded);
    this.ngAfterViewInit();
    //this.percentage = ((this.solded.valueOf() * 100) / this.event.capacity).toString() ;
    //this.percentage = this.percentage.toPrecision(1);
  }

  bookTicket(event: Event) {
    this.user = this.authenticationService.getToken();
    console.log('userid' + this.user.id);
    console.log(event.title);
    const ticket = new Ticket();
    ticket.event = event;
    ticket.orderDate = Date.now();
    ticket.title = 'Normal ';
    ticket.note = 'This ticket inculde entry fees';
    ticket.price = event.priceTicket;
    ticket.user = this.user;
    localStorage.setItem('eventTicket', JSON.stringify(ticket));
  }

  deleteEvent(){
    if (!(this.solded > 0)){
      this.eventService.delete(this.event.id).subscribe(resultat => {console.log(resultat); });
      this.isDeleted = true;
    }
  }

}
