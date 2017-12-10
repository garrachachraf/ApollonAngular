import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Showroom } from '../../shared/model/showroom.model'
import { ShowroomService } from '../shared/showroom.service'
declare var $ :any;
@Component({
  selector: 'app-showroom-list',
  templateUrl: './showroom-list.component.html',
  styleUrls: ['./showroom-list.component.css'],
  providers : [ShowroomService]
})
export class ShowroomListComponent implements OnInit {

  showrooms: Showroom[];
  constructor(
    private showroomService: ShowroomService,
    private route:Router
  ) { }

  ngOnInit() {
    this.showroomService.getAll()
      .subscribe(result => this.showrooms = result);
  }

  goTo(showroomId: number){
    this.route.navigate(['showroom/'+showroomId])
  }
}