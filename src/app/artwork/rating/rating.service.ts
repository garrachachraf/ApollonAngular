import { HttpHeaders } from '@angular/common/http';
import { Rating } from './../../shared/model/rating.model';
import { Showroom } from '../../shared/model/showroom.model';
import { DataService } from '../../shared/data.service';
import { AppSettings } from './../../shared/appSettings';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class RatingService extends DataService<Rating>{

    constructor(http:HttpClient){
      super(http,+AppSettings.API_ENDPOINT+"/ArtWork");
    }

    rate(ratingValue:number,artworkId:number): Observable<any>{
        return this.http.post(
            AppSettings.API_ENDPOINT+'rating/'+artworkId+'/'+ratingValue,
            null,
            {responseType: 'text'}
        );
    }

    getMyrating(userId: number): Observable<number>{
        return this.http.get<number>(AppSettings.API_ENDPOINT+'rating/myrating/'+userId);
    }

    getAvgRating(artworkId: number){
        return this.http.get<number>(AppSettings.API_ENDPOINT+'rating/'+artworkId);
    }
    
}
