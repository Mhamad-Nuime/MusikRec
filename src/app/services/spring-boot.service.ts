import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable()
export class SpringBootService {

  constructor(
    private http : HttpClient,
  ) { }
  getRequest<T>(pathName : string ) : Observable<T> {
    return this.http.get<T>(`${environment.springBootBaseUrl}`);
  }
  postRequest<T,D>(pathName: string, date : D) : Observable<T> {
    return this.http.post<T>(`${environment.springBootBaseUrl}${pathName}`, date);
  }
}
