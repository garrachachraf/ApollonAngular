import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class AdressApiService  {

  constructor(private http: HttpClient){

  }
  key = '428e1b2fddb1fc2f01160644d5cfa920';

  getcountries(){
    let countrylist ;
    let headers = new HttpHeaders();
    headers = headers.append("Access-Control-Allow-Origin","http://localhost:4200");
    headers = headers.append("Access-Control-Allow-Headers","X-Requested-With");
    this.http.get('http://battuta.medunes.net/api/country/all/?key=' + this.key+"&callback=?",{headers: headers}).subscribe(res => {countrylist = res; });

    console.log(JSON.parse(countrylist));
  }

}
