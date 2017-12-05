import { WishlistService } from './../../wishlist/shared/wishlist.service';
import { AuthenticationService } from './../../authentication/authentication.service';
import { Artwork } from './../../shared/model/artwork.model';
import { Component, OnInit, Input, Output, AfterViewInit, EventEmitter } from '@angular/core';

declare var $ :any;
@Component({
  selector: 'app-artwork-detail',
  templateUrl: './artwork-detail.component.html',
  styleUrls: ['./artwork-detail.component.css']
})
export class ArtworkDetailComponent implements OnInit {
  @Input() artwork: Artwork;
  @Output() onSelected = new EventEmitter<Artwork>();
  isAuthenticated: boolean;

  constructor(
    private authenticationService:AuthenticationService,
    private wishlistService: WishlistService
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


}
