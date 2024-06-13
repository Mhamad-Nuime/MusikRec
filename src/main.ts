import { enableProdMode, importProvidersFrom, isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/App component/app.routes';
import { AppComponent } from './app/App component/app.component';
import { environment } from './environments/environment';

import { register } from 'swiper/element/bundle';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { userInfoFeature } from './app/store/userAuthentication/user-auth.reducer';
import { tokenInterceptor } from './app/interceptors/token.interceptor';

register();

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes),
    provideStore(),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideState(userInfoFeature),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ]
});
