import { Artwork } from './../shared/model/artwork.model';
import { ArtworkService } from './../artwork/artwork-detail/artwork.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ArtworkService]
})
export class HomeComponent implements OnInit {
  trendingArtworks: Artwork[];
  constructor(
    private artworkService: ArtworkService
  ) { }

  ngOnInit() {
    this.artworkService.getArtworks(1).subscribe(
      res => {
        this.trendingArtworks=res;
        console.log(res);
        
      }
    )
  }

}
