import { Showroom } from '../../shared/model/showroom.model';
import { DataService } from '../../shared/data.service';
import { AppSettings } from './../../shared/appSettings';
import { Artwork } from './../../shared/model/artwork.model';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class ArtworkService extends DataService<Showroom>{

  constructor(http:HttpClient){
      super(http,+AppSettings.API_ENDPOINT+"/ArtWork");
    }

  getArtworks(page:number): Observable<Artwork[]> {
   return this.http.get<Artwork[]>(AppSettings.API_ENDPOINT+'ArtWork/findall/'+page);
  }
}
