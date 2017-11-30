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


import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';

const routes : Routes = [
  { path : '', component : HomeComponent},
  { path : 'showrooms', component : ShowroomListComponent},
  { path : 'artworks', component : ArtworkDetailComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    ShowroomDetailComponent,
    ShowroomListComponent,
    ArtworkDetailComponent,
    RatingComponent,
    HomeComponent,
    AuthenticationComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
