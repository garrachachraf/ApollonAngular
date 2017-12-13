import { ArtworkService } from './../artwork-detail/artwork.service';
import { Artwork } from './../../shared/model/artwork.model';
import { CollectionService } from './../../collection/collection.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication/authentication.service';
import { WishlistService } from '../../wishlist/shared/wishlist.service';
import {User} from "../../shared/model/user.module";
import {forEach} from "@angular/router/src/utils/collection";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormsModule, FormGroup, FormControl, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-create-artwork",
  templateUrl: "./create-artwork.component.html",
  styleUrls: ["./create-artwork.component.css"],
  providers: [ArtworkService]
})
export class CreateArtworkComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private wishlistService: WishlistService,
    private CollectionService: CollectionService,
    private artworkService: ArtworkService,
    private http: HttpClient
  ) {}
  thumbnail = true;
  user = new User();
  Artwork = new Artwork();
  isAuthenticated: boolean;
  @ViewChild("newForm") newForm: NgForm;
  ngOnInit() {
    this.isAuthenticated = this.authenticationService.isAuth;
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    console.log(this.user);
  }
  apollonavartar(avatar) {
    this.Artwork.mediaPath= 'http://127.0.0.1:18080/img/' + JSON.parse(avatar).path;
    this.thumbnail = false;
    console.log(avatar);
  }
  oncreate(title,description,price) {
  this.Artwork.title=title;
  this.Artwork.descreption=description;
  this.Artwork.price=price;
  this.Artwork.artist=this.user;
  this.artworkService.add(this.Artwork).subscribe(
 res=>{
       console.log(this.Artwork);
      }

   );
  }
}
