import { AuthenticationService } from './../../authentication/authentication.service';
import { Artwork } from './../../shared/model/artwork.model';
import { Component, OnInit, Input, Output, AfterViewInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-artwork-detail',
  templateUrl: './artwork-detail.component.html',
  styleUrls: ['./artwork-detail.component.css']
})
export class ArtworkDetailComponent implements OnInit {
  @Input() artwork: Artwork;
  @Output() onSelected = new EventEmitter<Artwork>();
  isAuthenticated: boolean;

  constructor(private authenticationService:AuthenticationService) { }

  ngOnInit() {
    this.isAuthenticated = this.authenticationService.isAuth;
    this.subscribeAuth();
  }
  subscribeAuth() {
    this.authenticationService.isAuthenticated$.subscribe(
      isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
      });
  }

}
