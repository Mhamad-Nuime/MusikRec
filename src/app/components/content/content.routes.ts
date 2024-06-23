import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import {
  SongsEffect,
} from 'src/app/store/songs/songs.effect';
import { songsFeature } from 'src/app/store/songs/songs.reducer';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./content.page').then((m) => m.ContentPage),
    children: [
      {
        path: 'main',
        providers: [
          provideState(songsFeature),
          provideEffects([SongsEffect]),
        ],
        loadChildren: () => import('./main/main.routes').then((r) => r.routes),
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
        loadComponent: () =>
          import('./details/details.page').then((m) => m.DetailsPage),
      },
      {
        path: '',
        redirectTo: '/content/main',
        pathMatch: 'full',
      },
    ],
  },
];
