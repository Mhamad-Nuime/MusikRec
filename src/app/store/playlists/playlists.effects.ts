import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PlaylistService } from "src/app/services/outer-service/springBootBasedServices/playlist.service";
import { getPlaylists, getPlaylistsFail, getPlaylistsSuccess } from "./playlists.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { Playlist } from "src/app/models/playlist.model";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class PlaylistEffects {
  private action$ = inject(Actions);
  private playlistService = inject(PlaylistService);
  loadPlaylist$ = createEffect(() => this.action$.pipe(
    ofType(getPlaylists),
    mergeMap(() => {
      console.log('hi effect work !');
      return this.playlistService.getPlaylists().pipe(
        map((playlists : Playlist[]) => getPlaylistsSuccess({playlists})),
        catchError((err: HttpErrorResponse) => {
          const message = `Can't To Load Playlist , ${err.message}`;
          return of(getPlaylistsFail({message}));
        })
      );
    }),
  ));
}