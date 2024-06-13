import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable()
export class SpringBootService {

  constructor(
    private http : HttpClient,
  ) { }
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });
  getRequest<T>(pathName : string ) : Observable<T> {
    return this.http.get<T>(`${environment.springBootBaseUrl}`, {headers: this.headers});
  }
  postRequest<D,T>(pathName: string, date : D) : Observable<T> {
    console.log('post request are sending..............');
    return this.http.post<T>(`${environment.springBootBaseUrl}${pathName}`, date, {headers: this.headers});
  }
}
