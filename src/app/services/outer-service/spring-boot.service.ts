import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@capacitor/core';
@Injectable()
export class SpringBootService {

  constructor(
    private http : HttpClient,
  ) { }
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });
  getRequest<T>(pathName : string, queryParams? : HttpParams ) : Observable<T> {
    return this.http.get<T>(`${environment.springBootBaseUrl + ( pathName || '' ) }`, {headers: this.headers, params: queryParams});
  }
  postRequest<D,T>(pathName: string, data : D, queryParams? : HttpParams) : Observable<T> {
    return this.http.post<T>(`${environment.springBootBaseUrl + ( pathName || '' )}`, data, {headers: this.headers, params: queryParams});
  }
}
