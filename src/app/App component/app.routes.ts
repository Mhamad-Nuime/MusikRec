import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('../components/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'login',
    loadComponent: () => import('../components/login/login.page').then( (m) => m.LoginPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('../components/signup/signup.page').then( (m) => m.SignupPage)
  },
  {
    path: 'content',
    loadChildren: () => import('../components/content/content.routes').then( (m) => m.routes),
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadComponent: () => import('../components/home/home.page').then((m) => m.HomePage),
  },

];
