import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class EmailvalidationService {

  constructor(private http: HttpClient) { }

  async checke(email: string) {

    const response = await this.http.get('https://api.mailgun.net/v3/address/validate?api_key=pubkey-82d648bbe3ea6783d6ae494c42a44b30&address=' + email  ).toPromise();
    return response;

  }

}
