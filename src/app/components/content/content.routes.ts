import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { PlaylistEffects } from 'src/app/store/playlists/playlists.effects';
import { playlistFeature } from 'src/app/store/playlists/playlists.reducer';
import {
  SongsEffects,
} from 'src/app/store/songs/songs.effect';
import { songsFeature } from 'src/app/store/songs/songs.reducer';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./content.page').then((m) => m.ContentPage),
    providers: [
      provideState(songsFeature),
      provideEffects([SongsEffects]),
      provideState(playlistFeature),
      provideEffects([PlaylistEffects]),
    ],
    children: [
      {
        path: 'main',
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
