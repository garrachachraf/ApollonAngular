import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../../shared/data.service';
import { AppSettings } from './../../shared/appSettings';
import {Gallery} from '../../shared/model/gallery.model';
import 'rxjs/add/operator/map';

@Injectable()
export class GalleriesService extends DataService<Gallery> {

  constructor(http: HttpClient) {
    super(http, 'http://127.0.0.1:18080/Apollo-web/app/galleries/v2');
  }
  updateGallery(g: Gallery) {
    return this.http.post(this.endpointUrl, g ,{responseType:'text'})
  }
  deleteGallery(g: number) {
    return this.http.delete(this.endpointUrl + '/' + g,{responseType:'text'});
  }
  addGallery(g: Gallery) {
    return this.http.put(this.endpointUrl + '/' , g,{ responseType:'text'});
  }

}
