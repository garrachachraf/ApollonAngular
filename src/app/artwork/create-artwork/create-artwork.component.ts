import { CollectionService } from './../../collection/collection.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication/authentication.service';
import { WishlistService } from '../../wishlist/shared/wishlist.service';

@Component({
  selector: 'app-create-artwork',
  templateUrl: './create-artwork.component.html',
  styleUrls: ['./create-artwork.component.css']
})
export class CreateArtworkComponent implements OnInit {

  constructor(  private authenticationService:AuthenticationService,
    private wishlistService: WishlistService,
    private CollectionService: CollectionService ) { }

  ngOnInit() {
  }




}
