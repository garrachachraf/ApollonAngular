import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Gallery} from '../../../shared/model/gallery.model';
import {MapService} from  '../../services/map.service';
import {Subscription} from 'rxjs/Subscription';
import {Marker} from '../../../shared/model/gallery.marker.model';
import {Router} from '@angular/router';

import {GalleriesService} from '../../services/galleries.service';

@Component({
  selector: 'app-galleries-list-item',
  templateUrl: './galleries-list-item.component.html',
  styleUrls: ['./galleries-list-item.component.scss'],
  providers: [GalleriesService]
})
export class GalleriesListItemComponent implements OnInit {

  subscription: Subscription;
  @Input()
  item: Gallery;
  @Output()
  ondelete = new EventEmitter<number>();
  @Input()
  indice: number;
  @Input()
  mine: number;
  constructor( private galleriesService: GalleriesService, private route: Router, private _mapService: MapService) { }


  selectedAddress(item: Marker) {
    console.log('selected nav item ' + item);
    this._mapService.changeMap(item);
  }
  ngOnInit() {

  }
  redirection(galleryId: number)  {
    this.route.navigate(['gallery/' + galleryId]);
  }

  delete(id: number) {

    console.log("indice:" + this.indice);
    this.ondelete.emit(this.indice);
    this.galleriesService.deleteGallery(id).toPromise()
      .then(() => {
        this.galleriesService.getAll();

      });
    this.ondelete.emit(this.indice);

  }
  toEvent(galleryId: number){
    this.route.navigate(['event/' + galleryId]);
  }
}
