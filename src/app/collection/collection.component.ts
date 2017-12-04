import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ShowroomService } from '../showroom/shared/showroom.service';
import { CollectionService } from './collection.service';
import { Artwork } from '../shared/model/artwork.model';

declare var $: any;

@Component({
  selector: "app-collection",
  templateUrl: "./collection.component.html",
  styleUrls: ["./collection.component.css"],
  providers: [CollectionService]
})
export class CollectionComponent implements OnInit, AfterViewInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private CollectionService: CollectionService
  ) {}
  @Input() collection: any;
  selectedArtwork: Artwork;
  collections: Array<any>[];

  ngOnInit() {
    this.CollectionService.getOne(1).subscribe(res => (this.collection = res));
    console.log(this.collection);
  }
  ngAfterViewInit() {
    $("#myCarousel").carousel({
      interval: 10000
    });
    $(".fdi-Carousel .item").each(function() {
      var next = $(this).next();
      if (!next.length) {
        next = $(this).siblings(":first");
      }
      next
        .children(":first-child")
        .clone()
        .appendTo($(this));

      if (next.next().length > 0) {
        next
          .next()
          .children(":first-child")
          .clone()
          .appendTo($(this));
      } else {
        $(this)
          .siblings(":first")
          .children(":first-child")
          .clone()
          .appendTo($(this));
      }
    });
  }
}
