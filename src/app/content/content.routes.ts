import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./content.page').then((m) => m.ContentPage),
    children: [
      {
        path: 'main',
        loadComponent: () =>
          import('../main/main.page').then((m) => m.MainPage),
      },
      {
        path: 'search',
        loadComponent: () =>
          import('../search/search.page').then((m) => m.SearchPage),
      },
      {
        path: 'playlists',
        loadComponent: () =>
          import('../playlists/playlists.page').then((m) => m.PlaylistsPage),
      },
      {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/content/main',
    pathMatch: 'full',
  },
];
