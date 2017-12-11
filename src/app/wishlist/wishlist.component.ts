import { RouterModule,Routes,Router } from '@angular/router';
import { OrderService } from './shared/order.service';
import { WishlistService } from './shared/wishlist.service';
import { Wishlist } from './../shared/model/wishlist.model';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { Artwork } from '../shared/model/artwork.model';

declare var $:any;

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
  providers: [OrderService]
})
export class WishlistComponent implements OnInit {
  wishlist: Wishlist ={"artWorks":[],"total":null};
  constructor(
    private wishlistService: WishlistService,
    private authenticationService: AuthenticationService,
    private orderService: OrderService,
    private route: Router
  ) { }

  ngOnInit() {
    this.getWishlist();
    // subscribe to wishlist items stream
    this.wishlistService.artworkAdded$.subscribe(
      artwork =>{
        if(!this.wishlist.artWorks.find(x=> x.id == artwork.id)){
          this.wishlist.artWorks.push(artwork);
          this.wishlist.total += artwork.price;
        }
      }
    )
    this.subscribeAuth();
  }

  subscribeAuth() {
    this.authenticationService.isAuthenticated$.subscribe(
      isAuthenticated => {
        if(isAuthenticated){
          this.getWishlist();
          this.getTotal();
        }
      });
  }
  getWishlist(){
    this.wishlistService.getWishlist().subscribe(
      res =>{
        this.wishlist = res
        this.getTotal();
        }
      )
  }

  getTotal(){
    this.wishlistService.getTotal().subscribe(
      res=>{
        this.wishlist.total=res;
      }
    )
  }
  removeItem(artwork: Artwork){
    this.wishlistService.removeItem(artwork.id).subscribe(
      res =>{
        this.wishlist.artWorks = this.wishlist.artWorks.filter(
        item => item.id != artwork.id
        )
        this.wishlist.total = this.wishlist.total - artwork.price;
      }
    )
  }

  createOrder(){
    this.orderService.createOrder(this.wishlist.artWorks).subscribe(
      res=>{
        this.wishlist = {"artWorks":[],"total":null};
        $('#wishlistModal').modal('hide')
        this.route.navigate(['order'])
      }
    )
  }
  goOrderHistory(){
    $('#wishlistModal').modal('hide')
    this.route.navigate(["order"])
  }
  

}
