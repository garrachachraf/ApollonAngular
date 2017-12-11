import { Component, OnInit, Input } from '@angular/core';
import {Gallery} from '../../../shared/model/gallery.model';
import {MapService} from  '../../services/map.service';
import {Subscription} from 'rxjs/Subscription';
import {Marker} from '../../../shared/model/gallery.marker.model';

@Component({
  selector: 'app-galleries-list-item',
  templateUrl: './galleries-list-item.component.html',
  styleUrls: ['./galleries-list-item.component.scss']
})
export class GalleriesListItemComponent implements OnInit {

  subscription: Subscription;
  @Input()
  item: Gallery;
  constructor(private _mapService: MapService) { }

  selectedAddress(item: Marker) {
    console.log('selected nav item ' + item);
    this._mapService.changeMap(item);
  }
  ngOnInit() {

  }
}
