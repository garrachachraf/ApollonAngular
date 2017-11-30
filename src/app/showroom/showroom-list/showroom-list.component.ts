import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Showroom } from '../../shared/model/showroom.model'
import { ShowroomService } from '../shared/showroom.service'
declare var $ :any;
@Component({
  selector: 'app-showroom-list',
  templateUrl: './showroom-list.component.html',
  styleUrls: ['./showroom-list.component.css'],
  providers : [ShowroomService]
})
export class ShowroomListComponent implements OnInit,AfterViewInit {

  showrooms: Showroom[];
  constructor(private showroomService: ShowroomService) { }

  ngOnInit() {
    this.showroomService.getAll()
      .subscribe(result => this.showrooms = result);
  }
  ngAfterViewInit() {
    $('#myCarousel').carousel({
      interval: 10000
  })
  $('.fdi-Carousel .item').each(function () {
      var next = $(this).next();
      if (!next.length) {
          next = $(this).siblings(':first');
      }
      next.children(':first-child').clone().appendTo($(this));

      if (next.next().length > 0) {
          next.next().children(':first-child').clone().appendTo($(this));
      }
      else {
          $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
      }
  });
  }
}
