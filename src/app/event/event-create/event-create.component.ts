import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Event } from '../../shared/model/event.model';
import { EventService } from './../event.service';
import {IMyDpOptions} from '../../my-date-picker/interfaces/my-options.interface';
import {IMyDateModel} from '../../my-date-picker/interfaces/my-date-model.interface';
import {AuthenticationService} from '../../authentication/authentication.service';
import {User} from '../../shared/model/user.module';
import {ActivatedRoute, Router} from '@angular/router';
import {GalleriesService} from '../../galleries/services/galleries.service';
import {Gallery} from '../../shared/model/gallery.model';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css'],
  providers: [EventService, GalleriesService, Gallery]
})
export class EventCreateComponent implements OnInit {
  date: number = Date.now();
  user: User;
  gallery: Gallery;
  id: number;
  sDate: string;
  eDate: string;
  isValid: boolean;
  fee: number;
  isValidDate: boolean;
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd.mm.yyyy',
  };


  constructor(private eventService: EventService,
              private authenticationService: AuthenticationService,
              private galleriesService: GalleriesService,
              private route: ActivatedRoute,
              private rout: Router,
  ) { }

  ngOnInit() {
    this.isValid = false;
    this.id = +this.route.snapshot.paramMap.get('id');
    this.galleriesService.getOne(this.id).subscribe(
      result => {
        this.gallery = result;
        console.log(this.gallery.name);
      });
  }

  dt(startDate: IMyDateModel, endDate: IMyDateModel){
    this.sDate = startDate.formatted;
    this.eDate = endDate.formatted;
    this.fee = this.gallery.pricing.hourly;
    this.fee = ((endDate.epoc - startDate.epoc ) * this.fee) / 100;
    this.isValidDate = true;
    if (startDate.epoc > endDate.epoc){
      this.isValidDate = false;
    }
}
  onSubmit(f: NgForm, title: string, description: string, capacity: number, ticketPrice: number, startDate: IMyDateModel, endDate: IMyDateModel) {
    if (startDate.jsdate < endDate.jsdate)
    {
      this.isValid = true;
      console.log(this.gallery.pricing.daily);
      this.user = this.authenticationService.getToken();
      const event = new Event();
      event.title = title;
      event.description = description;
      event.capacity = capacity;
      event.priceTicket = ticketPrice;
      event.creationDate = Date.now();
      event.startDate = +startDate.epoc.toString().concat('000');
      event.endDate = +endDate.epoc.toString().concat('000');
      event.user = this.user;
      event.gallery = this.gallery;
      console.log(event.creationDate);
      console.log(event.startDate);
      console.log(event.endDate);
      localStorage.setItem('eventCreate', JSON.stringify(event));
  //    this.eventService.add(event).subscribe(resultat => {console.log(resultat); });
 //     this.rout.navigate(['events']);
    }else{
      this.isValid = false;
    }



  }

}
