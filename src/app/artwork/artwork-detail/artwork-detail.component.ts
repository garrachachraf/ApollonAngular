import { User } from './../../shared/model/user.module';
import { Collection } from './../../shared/model/collection';
import { Artwork } from './../../shared/model/artwork.model';
import { Component, OnInit, Input, Output, AfterViewInit, EventEmitter } from '@angular/core';
import { CollectionService } from '../../collection/collection.service';
import { AuthenticationService } from '../../authentication/authentication.service';
@Component({
  selector: "app-artwork-detail",
  templateUrl: "./artwork-detail.component.html",
  styleUrls: ["./artwork-detail.component.css"],
  providers: [CollectionService]

})
export class ArtworkDetailComponent implements OnInit {
  @Input() artwork: Artwork;
  @Input() artworkin: boolean;

  artWorks: Array<Artwork>;
  collections: Collection[];
  collection: Collection;

  user: User;
  // tslint:disable-next-line:no-output-on-prefix

  @Output() onSelected = new EventEmitter<Artwork>();
  isAuthenticated: boolean;
  constructor(
    private CollectionService: CollectionService,
    private authService: AuthenticationService,
  private authenticationService:AuthenticationService) {}



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

  addArtToCollection(artwork: Artwork) {
    this.user = this.authService.getToken();
    console.log("yoddfsdfdf" + this.user.id);
    this.authService.getToken();
    this.CollectionService.getcollectionByUser(this.user.id).subscribe(
      result => {
        this.collections = result;
        console.log(this.collections[0]);
        this.collection = this.collections[0];
        console.log(this.collection);
        this.collection.artworks.push(artwork);
        this.artWorks = this.collection.artworks;
        this.CollectionService.update(this.collection).subscribe(err => {
          console.log(err);
        });
      }
    );
  }
}
