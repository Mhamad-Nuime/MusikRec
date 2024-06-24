import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { userInfoFeature } from '../store/userAuthentication/user-auth.reducer';
import { switchMap, take } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  //ensure that the request is an Authentication one or Not to inject the token inside it if it's not
  const path = req.url.split('/').pop() as string;
  if (['login', 'register'].includes(path)) {
    return next(req);
  }
  const store = inject(Store);
  return store.select(userInfoFeature.selectToken).pipe(
    take(1),
    switchMap((token) => {
      const clonedRequest = req.clone({
        headers: req.headers.set('Authorization', (token || 'bearer'))
      });
      return next(clonedRequest);
      
    }
  ));
};
