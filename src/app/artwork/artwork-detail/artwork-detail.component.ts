import { User } from './../../shared/model/user.module';
import { Collection } from './../../shared/model/collection';
import { Artwork } from './../../shared/model/artwork.model';
import { Component, OnInit, Input, Output, AfterViewInit, EventEmitter } from '@angular/core';
import { CollectionService } from '../../collection/collection.service';
import { AuthenticationService } from '../../authentication/authentication.service';
import { WishlistService } from './../../wishlist/shared/wishlist.service';

declare var $ :any;

@Component({
  selector: "app-artwork-detail",
  templateUrl: "./artwork-detail.component.html",
  styleUrls: ["./artwork-detail.component.css"],

})
export class ArtworkDetailComponent implements OnInit {
  @Input() artwork: Artwork;
  @Input() artworkin: boolean;
  artWorks: Array<Artwork>;
  collections: Collection[];
  collection: Collection;
  user: User;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onAdd = new EventEmitter();
  isAuthenticated: boolean;

  constructor(
    private authenticationService:AuthenticationService,
    private wishlistService: WishlistService,
    private CollectionService: CollectionService
  ) { }


  ngOnInit() {
    this.isAuthenticated = this.authenticationService.isAuth;
    this.subscribeAuth();
  }
  subscribeAuth() {
    this.authenticationService.isAuthenticated$.subscribe(
      isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
        this.wishlistService.getWishlist().subscribe()
      });
  }
  addToWishlist(){
    this.wishlistService.addItem(this.artwork.id).subscribe(
      res=>{
        this.wishlistService.addArtworkToStream(this.artwork)
        $('#wishlistModal').modal('show')
      }
    )
  }


  addArtToCollection(artwork: Artwork) {
    this.CollectionService.addArtworkToStream(artwork);
    this.user = this.authenticationService.getToken();
    console.log("yoddfsdfdf" + this.user.id);
    this.authenticationService.getToken();
    this.CollectionService.getcollectionByUser(this.user.id).subscribe(
      result => {
        this.collections = result;
        console.log(this.collections[0]);
        this.collection = this.collections[0];
        console.log(this.collection);
        this.collection.artworks.push(artwork);
        this.artWorks = this.collection.artworks;
         console.log("hello");
        this.CollectionService.update(this.collection).subscribe( res=>{





      },
      err => {
          console.log(err);
        });
      }
    );
  }
}
