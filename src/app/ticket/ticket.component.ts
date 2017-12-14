import { Component, OnInit } from '@angular/core';
import {TicketService} from './ticket.service';
import {Ticket} from '../shared/model/ticket.model';
import {tick} from "@angular/core/testing";
import {isNull, isNullOrUndefined} from "util";
import {isUndefined} from "ngx-bootstrap/bs-moment/utils/type-checks";
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
  providers : [TicketService]
})
export class TicketComponent implements OnInit {
  viewTicket: boolean;
  notBookedTicket: boolean;
  constructor(private ticketService: TicketService) {
  }

  ngOnInit() {
    this.notBookedTicket = false;
    this.viewTicket = false;
    let ticket: Ticket;
    ticket = JSON.parse(localStorage.getItem('eventTicket'));
    console.log('check');
    if (isNull(ticket)){
      console.log('null');
      this.notBookedTicket = true;
    }else{
      console.log('notnull');
      this.ticketService.add(ticket).subscribe(res => {console.log(res); });
      localStorage.removeItem('eventTicket');
    }
  }

  viewTick(){
    this.viewTicket = true;
  }



}
