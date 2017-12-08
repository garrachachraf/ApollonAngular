import { Wishlist } from './../../shared/model/wishlist.model';
import { DataService } from '../../shared/data.service';
import { AppSettings } from './../../shared/appSettings';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Subject } from 'rxjs/Subject';
import { Artwork } from '../../shared/model/artwork.model';

@Injectable()
export class WishlistService extends DataService<Wishlist>{
    constructor(http:HttpClient){
        super(http,AppSettings.API_ENDPOINT+"wishlist/");
    }
    artworks: Artwork[];
        // Observable string sources
    private artworksSource = new Subject<Artwork>();
   
    // Observable string streams
    artworkAdded$ = this.artworksSource.asObservable();
   
    // Service message commands
    addArtworkToStream(artwork: Artwork) {
        this.artworksSource.next(artwork);
    }

    getWishlist(){
        return this.http.get<Wishlist>(this.endpointUrl);
    }

    addItem(itemId: number){
        return this.http.post(this.endpointUrl+itemId,null,{responseType:'text'})
    }

    removeItem(itemId: number){
        return this.http.delete(this.endpointUrl+itemId,{responseType:'text'})
    }

    getTotal(){
        return this.http.get<number>(this.endpointUrl+'total')
    }
    
}
