import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

export abstract class DataService<T> {
  constructor(protected http: HttpClient, protected endpointUrl: string) {}

  getAll(): Observable<T[]> {
    console.log(this.endpointUrl);

    return this.http.get<T[]>(this.endpointUrl);
  }
  getOne(id: number): Observable<T> {
    return this.http.get<T>(this.endpointUrl + "/" + id);
  }

  add(T): Observable<any> {
    return this.http.post(this.endpointUrl, JSON.stringify(T),{
      headers: { "Content-Type": "application/json" }
    });
  }
  update(T): Observable<any> {
    return this.http.put(this.endpointUrl, JSON.stringify(T), {
      headers: { "Content-Type": "application/json" }
    });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.endpointUrl + "/" + id,{responseType:'text'});
  }
}
