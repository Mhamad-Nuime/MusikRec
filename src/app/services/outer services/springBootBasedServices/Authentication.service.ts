import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SpringBootService } from '../spring-boot.service';
import { UserAuthentication } from '../../../models/userAuth.interface';
import { LoginInfo } from 'src/app/models/userBasedModels/login/loginInfo';
import { Store } from '@ngrx/store';
import { saveUserInfo } from 'src/app/store/userAuthentication/user-auth.action';
import { SingUpInfo } from 'src/app/models/userBasedModels/signup/signupInfo';

@Injectable()
export class AuthenticationService {
  constructor(
    private springBootService: SpringBootService,
    private store: Store
  ) {}

  login(data: LoginInfo): Observable<UserAuthentication> {
    return this.springBootService
      .postRequest<LoginInfo, UserAuthentication>('api/v1/auth/login', data)
      .pipe(
        map((value) => {
          this.store.dispatch(saveUserInfo({ userInfo: value }));
          return value;
        })
      );
  }
  signup(data: SingUpInfo): Observable<UserAuthentication> {
    return this.springBootService
      .postRequest<LoginInfo, UserAuthentication>('api/v1/auth/register', data)
      .pipe(
        map((value) => {
          this.store.dispatch(saveUserInfo({ userInfo: value }));
          return value;
        })
      );
  }
}
