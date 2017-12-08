import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from '../authentication/authentication.service';

@Injectable()
export class MediaUploadService {

  constructor(private http: HttpClient , private auth: AuthenticationService) {}

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    let headers = new HttpHeaders();
    if (localStorage.getItem('currentUser')){
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      headers = headers.set('authorization', currentUser.token);
    }

    formdata.append('uploadedFile', file);

    const req = new HttpRequest('POST', 'http://localhost:18080/Apollo-web/app/upload', formdata, {
      reportProgress: true,
      responseType: 'text',
      headers: headers
    });

    return this.http.request(req);
  }

  getFiles(): Observable<string[]> {
    return null;
  }

}
