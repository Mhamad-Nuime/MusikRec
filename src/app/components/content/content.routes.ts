import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./content.page').then((m) => m.ContentPage),
    children: [
      {
        path: 'main',
        loadChildren: () =>
          import('./main/main.routes').then((r) => r.routes),
      },
      {
        path: 'search',
        loadComponent: () =>
          import('./search/search.page').then((m) => m.SearchPage),
      },
      {
        path: 'playlists',
        loadComponent: () =>
          import('./playlists/playlists.page').then((m) => m.PlaylistsPage),
      },
      {
        path: 'details/:id',
        loadComponent: () => import('./details/details.page').then( m => m.DetailsPage)
      },
      {
        path: '',
        redirectTo: '/content/main',
        pathMatch: 'full',
      },
    ],
  },
];
