import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Marker} from '../../shared/model/gallery.marker.model';

@Injectable()
export class MapService {

  mapInit: Marker= new Marker('', 11.171409, 40.890479, true);

  // Observable navItem source
  private _navItemSource = new BehaviorSubject<Marker>(this.mapInit);
  // Observable navItem stream
  navItem$ = this._navItemSource.asObservable();
  // service command
  changeMap(number) {
    this._navItemSource.next(number);
  }
}
