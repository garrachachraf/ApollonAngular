import { User } from './../../shared/model/user.model';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from './../../shared/appSettings';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class FollowService{

  constructor(private http:HttpClient){
    }

  follow(artistId:number): Observable<number> {
   return this.http.post<number>(AppSettings.API_ENDPOINT+'follow/'+artistId,null);
  }

  unfollow(artistId: number): Observable<any>{
    return this.http.delete<any>(AppSettings.API_ENDPOINT+'follow/'+artistId,null);
  }

  getFollowers(artistId: number): Observable<User[]>{
    return this.http.get<User[]>(AppSettings.API_ENDPOINT+'follow/artist/'+artistId);
  }

  getFollowings(userId: number): Observable<User[]>{
      return this.http.get<User[]>(AppSettings.API_ENDPOINT+'follow/user/'+userId);
  }

  countFollowings(userId: number): Observable<number>{
    return this.http.get<number>(AppSettings.API_ENDPOINT+'follow/user/count/'+userId);
  }

  countFollowers(artistId: number): Observable<number>{
    return this.http.get<number>(AppSettings.API_ENDPOINT+'follow/artist/count/'+artistId);
  }
  
}