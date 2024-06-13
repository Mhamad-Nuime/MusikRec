import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { userInfoFeature } from '../store/userAuthentication/user-auth.reducer';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  //ensure that the request is an Authentication one or Not to inject the token inside it if it's not
  const path = req.url.split('/').pop() as string;
  console.log(path);
  if (!(path in ['login', 'register'])) {
    const store = inject(Store);
    let token: string;
    store.select(userInfoFeature.selectToken).subscribe((value) => {
      if (value) {
        token = value;
        req.headers.set('Authorization', token);
      }
    });
  }
  //send the request
  return next(req);
};
