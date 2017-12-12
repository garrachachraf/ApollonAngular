import { Artwork } from './../../shared/model/artwork.model';
import { Showroom } from './../../shared/model/showroom.model';
import { DataService } from '../../shared/data.service';
import { AppSettings } from './../../shared/appSettings';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ShowroomService extends DataService<Showroom>{
    constructor(http: HttpClient){
        super(http, AppSettings.API_ENDPOINT + 'showroom');
      }
    addArtworks(showroom: Showroom){
        return this.http.post(this.endpointUrl + '/artworks', showroom, {responseType: 'text'});
    }

    create(showroom: Showroom){
        return this.http.post(this.endpointUrl, showroom, {responseType: 'text'});
    }
    getByArtistId(artistID: number){
      return this.http.get<Showroom[]>(this.endpointUrl + '/artist/' + artistID);
    }
}
