import { ArtworkService } from '../../artwork/artwork-detail/artwork.service';
import { Component,Input, OnInit,AfterViewInit } from '@angular/core'
import { Showroom } from '../../shared/model/showroom.model'
import { Artwork } from '../../shared/model/artwork.model'
import { ShowroomService } from '../shared/showroom.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service';
import { User } from '../../shared/model/user.module';
declare var jQuery:any;
declare var $ :any;
@Component({
  selector: 'app-showroom-detail',
  templateUrl: './showroom-detail.component.html',
  styleUrls: ['./showroom-detail.component.css'],
  providers : [ShowroomService,ArtworkService]
})
export class ShowroomDetailComponent implements OnInit, AfterViewInit {
  @Input() showroom: Showroom;
  showroomTitle: string;
  currentUser : User;
  myArtworks: Artwork[]=[];
  isAuthenticated: boolean;
  isMyShowroom:boolean=false;
  editMode:boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private showroomService: ShowroomService,
    private authenticationService: AuthenticationService,
    private artworkService: ArtworkService
  ) {}

  ngOnInit() {
    this.subscribeAuth();
    let id = this.route.snapshot.paramMap.get('id');
    this.getShowroom(parseInt(id));
    this.currentUser=this.authenticationService.getToken();
    setTimeout(()=>{
      this.isAuthenticated = this.authenticationService.isAuth;
    },0)
  }
  
  getShowroom(showroomId: number){
    this.showroomService.getOne(showroomId).subscribe(
      result =>{
        this.showroom= result;
        this.isMyShowroom=this.isAuthenticated && this.showroom.artist.userName == this.currentUser.userName
        console.log(this.showroom)
      }
    )
  }

  addToShowroom(artwork: Artwork){
    if(!this.showroom.artWorks.find(x=> x.id==artwork.id)){
      this.showroom.artWorks.push(artwork)
    }
    this.myArtworks=this.myArtworks.filter(x=> x.id != artwork.id)
  }
  removeFromShowroom(artwork: Artwork){
    this.showroom.artWorks = this.showroom.artWorks.filter(x=> x.id != artwork.id)
    this.myArtworks.push(artwork)
  }

  deleteShowroom(){
    this.showroomService.delete(this.showroom.id).subscribe(
      res=>{
        this.router.navigate(['profile']);
        this.closeModal();
      }
    )
  }

  closeModal() {
    $("#confirmationModal").modal("hide");
  }
  openModal(a) {
    $("#confirmationModal").modal("show");
  }
  enableEdit(){
    this.editMode=true;
    this.getMyArtworks();
  }

  getMyArtworks(){
    this.artworkService.getArtworksByArtist(this.currentUser.id).subscribe(
      res=>{
        res.forEach(
          item=>{
            if(!this.showroom.artWorks.find(x=>x.id==item.id) && !this.myArtworks.find(x=>x.id==item.id) )
            this.myArtworks.push(item);
          }
        )
      }
    )
  }
  save(){
    if(this.showroomTitle != null)
      this.showroom.title= this.showroomTitle;
    this.showroomService.addArtworks(this.showroom).subscribe(
      res=>{
        this.editMode = false;
      }
    )
  }

  cancel(){
    this.editMode = false;
    this.myArtworks= [];
    this.getShowroom(this.showroom.id);
  }
  subscribeAuth() {
    this.authenticationService.isAuthenticated$.subscribe(
      isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
        this.currentUser=this.authenticationService.getToken();
        this.isMyShowroom=this.isAuthenticated && this.showroom.artist.userName == this.currentUser.userName
      });
    }

  ngAfterViewInit(){
    jQuery(document).ready(function($) {
      
             $('#myCarousel').carousel({
                     interval: 5000
             });
      
             //Handles the carousel thumbnails
             $('[id^=carousel-selector-]').click(function () {
             var id_selector = $(this).attr("id");
             try {
                 var id = /-(\d+)$/.exec(id_selector)[1];
                 console.log(id_selector, id);
                 jQuery('#myCarousel').carousel(parseInt(id));
             } catch (e) {
                 console.log('Regex failed!', e);
             }
         });
             // When the carousel slides, auto update the text
             $('#myCarousel').on('slid.bs.carousel', function (e) {
                      var id = $('.item.active').data('slide-number');
                     $('#carousel-text').html($('#slide-content-'+id).html());
             });
     });
  }


}
