import { OrderComponent } from './wishlist/order/order.component';
import { AuthenticationService } from './authentication/authentication.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './authentication/token.interceptor';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
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
import {AdressApiService} from './profile/shared/addressApi.service';
import {EmailvalidationService} from './registeruser/shared/emailvalidation.service';

const routes: Routes = [
  { path : '', component : HomeComponent},
  { path : 'showrooms', component : ShowroomListComponent},
  { path : 'showroom/:id', component : ShowroomDetailComponent},
  { path : 'artworks', component : ArtworkDetailComponent},
  { path : 'reg' , component : RegisteruserComponent },
  { path : 'collection', component : CollectionComponent},
  { path : 'profile/:id', component : ProfileDetailsComponent },
  { path : 'profile', component : ProfileDetailsComponent },
  { path : 'collection', component : CollectionComponent},
  { path : 'order', component : OrderComponent},
  { path : 'showroomform', component : ShowroomFormComponent},
  { path : 'update' , component: ProfileUpdateComponent }

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
    RegisteruserComponent,
    NgxIntlTelInputComponent,
    MediaUploadComponent,
    ProfileDetailsComponent,
    OrderComponent,
    ShowroomFormComponent,
    ProfileUpdateComponent,

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
    BrowserAnimationsModule
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
    EmailvalidationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
