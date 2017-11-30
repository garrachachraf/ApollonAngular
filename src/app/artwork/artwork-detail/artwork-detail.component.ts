import { Artwork } from './../../shared/model/artwork.model';
import { Component, OnInit, Input, Output, AfterViewInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-artwork-detail',
  templateUrl: './artwork-detail.component.html',
  styleUrls: ['./artwork-detail.component.css']
})
export class ArtworkDetailComponent implements OnInit {
  @Input() artwork: Artwork;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSelected = new EventEmitter<Artwork>();
  constructor() { }

  ngOnInit() {

  }

}
