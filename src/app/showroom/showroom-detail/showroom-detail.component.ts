import { Component,Input, OnInit,AfterViewInit } from '@angular/core'
import { Showroom } from '../../shared/model/showroom.model'
import { Artwork } from '../../shared/model/artwork.model'
import { ShowroomService } from '../shared/showroom.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-showroom-detail',
  templateUrl: './showroom-detail.component.html',
  styleUrls: ['./showroom-detail.component.css'],
  providers : [ShowroomService]
})
export class ShowroomDetailComponent implements OnInit, AfterViewInit {
  @Input()
  showroom : Showroom;
  selectedArtwork : Artwork;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private showroomService: ShowroomService
  ) {}

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.showroomService.getOne(parseInt(id))
      .subscribe(result =>{
        this.showroom= result;
        console.log(this.showroom)
      } )
  }
  onSelectArtwork(artwork : Artwork){
    this.selectedArtwork = artwork;
      $('#artwork-detail-modal').modal('show');
  }
  ngAfterViewInit(){

  }


}
