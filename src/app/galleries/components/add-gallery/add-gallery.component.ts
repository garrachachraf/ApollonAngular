import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import { MapsAPILoader } from '@agm/core';
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
  selector: 'app-add-gallery',
  templateUrl: './add-gallery.component.html',
  styleUrls: ['./add-gallery.component.css'],
  providers: [GalleriesService],
  encapsulation: ViewEncapsulation.None
})
export class AddGalleryComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public formatted_address: string;

  thumbnail = true ;

  avatar: any ;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  gallery: Gallery;
  currentUser: User;
  isAuthenticated: boolean;
  constructor(    private mapsAPILoader: MapsAPILoader,
                  private ngZone: NgZone,
    private authenticationService: AuthenticationService,    private route: ActivatedRoute,
    private router: Router, private galleriesService: GalleriesService) {
    this.gallery = {
      'name': null,
      'maxCapacity': null,
      'location': {  address: null,
    longitude: null,
    latitude: null,
    isOpen: false},
      'pricing': {cleaningFee: null ,  hourly: null,
    daily: null,
    monthly: null,
    weekly: null,
    minimumBooking: null,
    securityDeposit: null},
      'description': null,
      'galleryOwner': null,
      'album': [],
      'calendar': []
    };
    this.gallery.surface = 0 ;
   // this.gallery.pricing.cleaningFee = 0 ;

  }

  ngOnInit() {

    this.subscribeAuth();
    const id = this.route.snapshot.paramMap.get('id');
    this.currentUser = this.authenticationService.getToken();
    setTimeout(() => {
      this.isAuthenticated = this.authenticationService.isAuth;

    }, 0);
    this.zoom = 14;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();


          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.gallery.location.latitude = place.geometry.location.lat();
          this.gallery.location.longitude = place.geometry.location.lng();
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.formatted_address = place.formatted_address;
          //this.zoom = 14;
          console.log(this.formatted_address);
          console.log(this.latitude);
          console.log(this.longitude);
          console.log(this.zoom);


        });
      });
    });
  }
  subscribeAuth() {
    this.authenticationService.isAuthenticated$.subscribe(
      isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
        this.currentUser = this.authenticationService.getToken();
        // this.isMyGallery = this.isAuthenticated &&  this.gallery.galleryOwner.userName == this.currentUser.userName;
      });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.gallery.location.latitude = position.coords.latitude;
        this.gallery.location.longitude = position.coords.longitude;
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        //this.zoom = 14;
      });
    }
  }
  apollonavartar(avatar) {
    this.thumbnail = false;
    this.avatar = avatar;
  }
  Add() {
    this.gallery.imagePath =  JSON.parse(this.avatar).path ;
    this.gallery.imagePath = 'http://127.0.0.1:18080/img/' +  this.gallery.imagePath ;
    this.gallery.galleryOwner = this.authenticationService.getToken();
    let gallery = Object.assign({}, this.gallery);
    delete gallery.location.isOpen ;
    this.galleriesService.addGallery(gallery).subscribe(res => { this.router.navigate(['galleries']); });

    //this.router.navigate(['galleries']);
  }
  getGalleryById(id: number) {
    this.galleriesService.getOne(id).subscribe(
      result => {
        this.gallery = result;
      }

    );
  }
}
