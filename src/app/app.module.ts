import { AgmCoreModule } from '@agm/core';
import { AuthGuard } from './authentication/auth-guard.service';
import { OrderComponent } from './wishlist/order/order.component';
import { AuthenticationService } from './authentication/authentication.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './authentication/token.interceptor';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RecaptchaModule } from "ng-recaptcha";
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { RatingComponent } from './artwork/rating/rating.component';
import { ArtworkDetailComponent } from './artwork/artwork-detail/artwork-detail.component';
import { ShowroomListComponent } from './showroom/showroom-list/showroom-list.component';
import { ShowroomDetailComponent } from './showroom/showroom-detail/showroom-detail.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ShareModule } from 'ng2share/share.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { CollectionComponent } from './collection/collection.component';
import { FollowComponent } from './user/follow/follow.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CreateArtworkComponent } from './artwork/create-artwork/create-artwork.component';

import { RegisteruserComponent } from './registeruser/registeruser.component';
import {BsDropdownModule} from 'ngx-bootstrap';
import {NgxIntlTelInputComponent, NgxIntlTelInputModule, NgxIntlTelInputService} from 'ngx-intl-tel-input';
import {MediaUploadService} from './media-upload/media-upload.service';
import {MediaUploadComponent} from './media-upload/media-upload.component';
import {FormWizardModule} from 'angular2-wizard/dist';
import {ProfileDetailsComponent} from './profile/profile-details/profile-details.component';
import {SendsmsService} from './registeruser/shared/sendsms.service';
import {ProfileService} from './profile/shared/profile.service';
import { ShowroomFormComponent } from './showroom/showroom-form/showroom-form.component';
import {FollowService} from './user/follow/follow.service';
import { ProfileUpdateComponent } from './profile/profile-update/profile-update.component';
import {EmailvalidationService} from './registeruser/shared/emailvalidation.service';
import {AdressApiService} from './profile/shared/addressApi.service';
import { GalleriesListComponent } from './galleries/components/galleries-list/galleries-list.component';
import { GalleriesListItemComponent } from './galleries/components/galleries-list-item/galleries-list-item.component';
import { GalleriesListScrollerComponent } from './galleries/components/galleries-list-scroller/galleries-list-scroller.component';
import { VirtualScrollModule } from 'angular2-virtual-scroll';
import { Routes, RouterModule } from '@angular/router';
import {TicketComponent} from './ticket/ticket.component';
import {EventComponent} from './event/event.component';
import {EventCreateComponent} from './event/event-create/event-create.component';
import {EventDetailComponent} from './event/event-detail/event-detail.component';
import {EventHappeningComponent} from './event/event-happening/event-happening.component';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {MyDatePickerModule} from 'mydatepicker';
import {NgxPaginationModule} from 'ngx-pagination';
import {EventService} from './event/event.service';
import {TicketService} from './ticket/ticket.service';
const routes: Routes = [
  { path : '', component : HomeComponent},
  { path : 'showroom/:id', component : ShowroomDetailComponent},
  { path : 'reg' , component : RegisteruserComponent },
  { path : 'profile', component : ProfileDetailsComponent , canActivate: [AuthGuard] },
  { path : 'profile/:id', component : ProfileDetailsComponent },
  { path : 'collection', component : CollectionComponent},
  { path : 'order', component : OrderComponent},
  {
    path : 'showroomform',
    component : ShowroomFormComponent,
    canActivate: [AuthGuard]
  },
  { path : 'update' , component: ProfileUpdateComponent , canActivate: [AuthGuard]},
  { path : 'galleries' , component: GalleriesListComponent },
  { path : 'update' , component: ProfileUpdateComponent },
  { path : 'galleries' , component: GalleriesListComponent },
  { path: 'showrooms', component: ShowroomListComponent, pathMatch: 'full'  },
  { path: 'artworks', component: CreateArtworkComponent, pathMatch: 'full' },
  { path: 'collection', component: CollectionComponent , pathMatch: 'full' },
  { path : 'events', component : EventComponent},
  { path : 'ticket', component : TicketComponent},
  { path : 'event/:id', component : EventCreateComponent},
  { path : 'eventss', component : EventComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    ShowroomDetailComponent,
    ShowroomListComponent,
    ArtworkDetailComponent,
    RatingComponent,
    HomeComponent,
    AuthenticationComponent,
    CollectionComponent,
    FollowComponent,
    WishlistComponent,
    CreateArtworkComponent,
    RegisteruserComponent,
    NgxIntlTelInputComponent,
    MediaUploadComponent,
    ProfileDetailsComponent,
    OrderComponent,
    ShowroomFormComponent,
    ProfileUpdateComponent,

    GalleriesListComponent,
    GalleriesListItemComponent,
    GalleriesListScrollerComponent,

    TicketComponent,
    EventComponent,
    EventCreateComponent,
    EventDetailComponent,
    EventHappeningComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    FormWizardModule,
    ShareModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule,

    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDxzZBbmKANs1lD8-rwULOgKGcXjkK7jTs",
      libraries: ["places"]
    }),
    VirtualScrollModule,

    RecaptchaModule.forRoot()


    PdfViewerModule,
    MyDatePickerModule,
    NgxPaginationModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthenticationService,
    NgxIntlTelInputService,
    MediaUploadService,
    SendsmsService,
    ProfileService,
    FollowService,
    AdressApiService,
    EmailvalidationService,
    AuthGuard,
    EventService,
    TicketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
