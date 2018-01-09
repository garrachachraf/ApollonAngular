import { Component,  Input, OnInit } from '@angular/core';

import {} from '@types/googlemaps';
import {Gallery} from '../../../shared/model/gallery.model';
import {User} from '../../../shared/model/user.module';
import { AuthenticationService } from '../../../authentication/authentication.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {GalleriesService} from '../../services/galleries.service';
import {CalendarEvent} from '../../../shared/model/gallery.calendar.option.model';
import {Schedule} from '../../../shared/model/schedule.model';
import {Marker} from '../../../shared/model/gallery.marker.model';

import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-gallery-details',
  templateUrl: './gallery-details.component.html',
  styleUrls: ['./gallery-details.component.scss'],
  providers: [GalleriesService],
  encapsulation: ViewEncapsulation.None
})
export class GalleryDetailsComponent implements OnInit {
  @Input()
  gallery: Gallery;
  currentUser: User;
  isMyGallery= false;
  isAuthenticated: boolean;
  map: any = null;
  startEdit: boolean;
  iconUrl = 'http://i.imgur.com/0TctIfY.png';

  mapInit: Marker= new Marker('', 11.171409, 40.890479, true);

  /* search */


  /*************************
   */
  latChild = 40.890479;
  lngChild = 11.171409;
  icon = '../../../../assets/galleriesStyle/marker.png';
  /*************************
   ************************/
  CalendarEvents: CalendarEvent[] = [];
  tmp: CalendarEvent = new CalendarEvent (null, null, null, null);
  calendarOptions: Object = {
    themeSystem: 'bootstrap3',
    header: {
      center: 'month,agendaFourDay' // buttons for switching between views
    },
    views: {
      agendaFourDay: {
        type: 'agenda',
        duration: { days: 4 },
        buttonText: '4 day'
      },
      month: { // name of view
        titleFormat: 'YYYY, MMMM, DD'
        // other view-specific options here
      }
    },
    eventClick: function(event, jsEvent, view ) {
      console.log(event);
      //this.eventOut = event
      //this.eventOut.type = 'update'
    },
    height: 'auto',
    fixedWeekCount : false,
    editable: true,
    eventLimit: true, // allow "more" link when too many events
  };

  constructor(
    private authenticationService: AuthenticationService,    private route: ActivatedRoute,
    private router: Router, private galleriesService: GalleriesService) {
    this.startEdit = false;

  }

  ngOnInit() {
    this.subscribeAuth();
    const id = this.route.snapshot.paramMap.get('id');
    this.getGalleryById(parseInt(id));
    this.currentUser = this.authenticationService.getToken();
    setTimeout(() => {
      this.isAuthenticated = this.authenticationService.isAuth;

    }, 0);
  }

  getGalleryById(id: number) {
    this.galleriesService.getOne(id).subscribe(
      result => {
        this.gallery = result;
        this.isMyGallery = this.isAuthenticated && this.gallery.galleryOwner.id == this.currentUser.id;
        console.log('howa:' + this.isMyGallery);
        this.latChild = this.gallery.location.latitude;
        this.lngChild = this.gallery.location.longitude;
        this.MappingEvents(this.gallery.calendar);
        this.calendarOptions['events'] = this.CalendarEvents;
        console.log(this.CalendarEvents);
      }

    );
  }
  subscribeAuth() {
    this.authenticationService.isAuthenticated$.subscribe(
      isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
        this.currentUser = this.authenticationService.getToken();
        // this.isMyGallery = this.isAuthenticated &&  this.gallery.galleryOwner.userName == this.currentUser.userName;
      });
  }

  onReady(map) {
    this.map = map;
  }
  onCalendarInit(initialized: boolean) {
    console.log('Calendar initialized');
  }
  dd (o: boolean)  {
    console.log(o);
  }
  MappingEvents(list: Schedule[]) {
    console.log(list);
    for (let i = 0; i < list.length; i++) {
      this.tmp.start = list[i].startDate;
      this.tmp.end = list[i].endDate;
      this.tmp.title = list[i].title;
      if (list[i].type == 'Holiday')
        this.tmp.color = 'red';
      else if (list[i].type == 'Renovations')
        this.tmp.color = 'purple';
      else if (list[i].type == 'Event')
        this.tmp.color = 'yellow';
      else if (list[i].type == 'Other')
        this.tmp.color = 'blue';
      this.CalendarEvents.push(this.tmp);

      this.tmp = {'title': null, 'start': null, 'end': null, 'color': null};
    }
    console.log(this.CalendarEvents);

  }
  toogleEdit() {
    this.startEdit = ! this.startEdit;
  }


  markerDragEnd(marker: Marker, $event: any) {
    marker.latitude = $event.coords.lat;
    marker.longitude = $event.coords.lng;


    // const updatedMarker: Marker = {
    //   name: marker.name,
    //   lat: parseFloat(marker.lat),
    //   lng: parseFloat(marker.lng),
    //   draggable: false
    // }

  }
  Save()  {

    this.galleriesService.updateGallery(this.gallery).subscribe(res => { this.router.navigate(['galleries']); });

  }
  redi()  {
    this.router.navigate(['galleries']);
  }
}
