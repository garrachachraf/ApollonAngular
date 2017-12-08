import { ResponseType } from '@angular/http';
import { DataService } from '../../shared/data.service';
import { AppSettings } from './../../shared/appSettings';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Order } from '../../shared/model/order.model';
import { Artwork } from '../../shared/model/artwork.model';

@Injectable()
export class OrderService extends DataService<Order>{

    constructor(http:HttpClient){
        super(http,AppSettings.API_ENDPOINT+"order");
    }

    getOrdersByUserId(userId: number): Observable<Order[]>{
        return this.http.get<Order[]>(this.endpointUrl+'/'+userId);
    }

    createOrder(artworks: Artwork[]){
        return this.http.post(this.endpointUrl,artworks,{responseType:'text'})
    }
}