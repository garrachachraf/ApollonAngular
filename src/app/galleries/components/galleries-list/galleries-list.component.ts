import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
import { FormControl } from '@angular/forms';
import {GalleriesService} from '../../services/galleries.service';
import {Gallery} from '../../../shared/model/gallery.model';
import { ViewEncapsulation } from '@angular/core';
import {Marker} from '../../../shared/model/gallery.marker.model';
import {MAP_STYLE} from '../../config/config';
import { MapService } from  '../../services/map.service';
import {Subscription} from 'rxjs/Subscription';
import {Event} from '../../../shared/model/event.model';
import {isNull} from "util";
import { Router } from '@angular/router';

@Component({
  selector: 'app-galleries-list',
  templateUrl: './galleries-list.component.html',
  styleUrls: ['./galleries-list.component.css'],
  providers: [GalleriesService, MapService],
  encapsulation: ViewEncapsulation.None
})
export class GalleriesListComponent implements OnInit {
  /* search */
  @ViewChild('search')
  public searchElementRef: ElementRef;
  public searchControl: FormControl;
  /*************/
  styles: any = MAP_STYLE;
  /**************/
  subscription: Subscription;
  /***********************/
  galleries: Gallery[];
  markers: Marker[]= [];
  title = 'Angular4 AGM Demo';

  zoomValue = 5;
  iconUrl = 'http://i.imgur.com/0TctIfY.png';
  isOpen = true; //description
  radius = 500;
  fillColor = 'rgba(194,60,172,1)';
  geoJson: Object = null;
  map: any = null;
  geoJsonReady = false;
  isPayed: boolean;
  mapInit: Marker= new Marker('', 11.171409, 40.890479, true);

  constructor(
    private mapsAPILoader: MapsAPILoader, private route: Router,
    private ngZone: NgZone, private galleriesService: GalleriesService, private _mapService: MapService) {
  }

  ngOnInit() {
    let event: Event;
    this.isPayed = true;
    event = JSON.parse(localStorage.getItem('eventCreate'));
    if (!isNull(event)) {
      this.isPayed = false;
      localStorage.removeItem('eventCreate');
    }
    this.subscription = this._mapService.navItem$.subscribe(
      item => this.mapInit = item);
    //create search FormControl
    this.searchControl = new FormControl();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          //get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();


          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.mapInit.latitude  = place.geometry.location.lat();
          this.mapInit.longitude  = place.geometry.location.lng();
          //  this.formatted_address = place.formatted_address;
          //this.zoom = 14;



        });
      });
    });
    this.galleriesService.getAll().subscribe(result => {this.galleries = result; } );
    console.log('*********');
    console.log(this.galleries);
    console.log('**********');

    console.log('Start: ' + new Date());

  }


  onReady(map) {
    this.map = map;
  }

  Myposition()  {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.mapInit.latitude  = position.coords.latitude;
        this.mapInit.longitude  = position.coords.longitude;
        this.zoomValue = 15 ;
      });
    }
    console.log('nzil');
  }

  toggleChild() {
    console.log(this.isOpen);
    this.isOpen = !this.isOpen;
  }
  public markerClick(e) {
    console.log('**');
    console.log();
    this.isOpen = true;
  }


  redirectionAdd()  {
    this.route.navigate(['galleries/Add']);
  }
}
