import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class AdressApiService  {

  constructor(private http: HttpClient){

  }
  key = '428e1b2fddb1fc2f01160644d5cfa920';

  getcountries(){
    return this.http.get('https://battuta.medunes.net/api/country/all/?key='+this.key);
  }

  getstates(country:string){

      return this.http.get('https://battuta.medunes.net/api/region/'+country+'/all/?key='+this.key);
  }
}
