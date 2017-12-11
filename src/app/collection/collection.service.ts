import { Collection } from './../shared/model/collection';
import { AppSettings } from './../shared/appSettings';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Observable } from 'rxjs/Observable';
import { Artwork } from '../shared/model/artwork.model';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class CollectionService extends DataService<any> {
  constructor(http: HttpClient) {
    super(http, AppSettings.API_ENDPOINT + "Collection");
  }
  artworks: Artwork[];
  // Observable string sources
  private artworksSource = new Subject<Artwork>();
  artworkAdded$ = this.artworksSource.asObservable();

  // Service message commands
  addArtworkToStream(artwork: Artwork) {
    this.artworksSource.next(artwork);
  }
  getcollectionByUser(page: number): Observable<Collection[]> {
    return this.http.get<Collection[]>(
      AppSettings.API_ENDPOINT + "Collection/user/" + page
    );
  }
}
