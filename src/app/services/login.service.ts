import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpringBootService } from './spring-boot.service';

type loginRequest = {
  'email': string | null | undefined;
  'password': string | null | undefined;
};
type loginResponse = {
  'token': string;
};

@Injectable()
export class UserLoginService {
  constructor(private springBootService: SpringBootService) {}
  userLogin(date: loginRequest): Observable<loginResponse> {
    return this.springBootService.postRequest<loginResponse, loginRequest>(
      'api/v1/auth/authenticate',
      date
    );
  }
}
