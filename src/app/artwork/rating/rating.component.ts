import { Rating } from './../../shared/model/rating.model';
import { Component, OnInit,Input,AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  template: `<div class="ui star rating star-rating" data-rating="4"></div>`,
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  @Input()
  rating : Rating;
  constructor() { }

  ngOnInit() {
  }

}
