import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ShowroomService } from '../showroom/shared/showroom.service';
import { CollectionService } from './collection.service';
import { Artwork } from '../shared/model/artwork.model';
import { AuthenticationService } from '../authentication/authentication.service';

declare var $: any;

@Component({
  selector: "app-collection",
  templateUrl: "./collection.component.html",
  styleUrls: ["./collection.component.css"],
  providers: [AuthenticationService]
})
export class CollectionComponent implements OnInit, AfterViewInit {
  @Input() collection: any;
  selectedArtwork: Artwork;
  collections: Array<any>[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private CollectionService: CollectionService,
    private authenticationService: AuthenticationService
  ) {

  }



  ngOnInit() {
    this.CollectionService.artworkAdded$.subscribe(artwork => {
      console.log("stream " + artwork);
      if (!this.collection.artworks.includes(artwork)) {
        this.collection.artworks.push(artwork);
      }
    });
    this.getcollection();
    console.log(this.collection);
    this.subscribeAuth();
  }
  subscribeAuth() {
    this.authenticationService.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.getcollection();
      }
    });
  }
  getcollection() {
    this.CollectionService.getOne(1).subscribe(res => (this.collection = res));
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
