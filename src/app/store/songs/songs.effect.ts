import { Injectable, inject } from '@angular/core';
import { SongService } from 'src/app/services/outer-service/springBootBasedServices/song.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  getHistorySongs,
  getHistorySongsFail,
  getHistorySongsSuccess,
  getLikedSongs,
  getLikedSongsFail,
  getLikedSongsSuccess,
  getRecommandedSongs,
  getRecommandedSongsFail,
  getRecommandedSongsSuccess,
  getTrendySongs,
  getTrendySongsFail,
  getTrendySongsSuccess,

} from './songs.action';
import { catchError, map, mergeMap, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
@Injectable()
export class SongsEffects {

  private actions$ = inject(Actions);
  private songService = inject(SongService);

  loadTrendySongs$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getTrendySongs),
      mergeMap(() => {
        return this.songService
          .getTrendy()
          .pipe(
            map((songs) => getTrendySongsSuccess({ songs })),
            catchError( (err: HttpErrorResponse) => {
              const errorMessage = `Can't Load Songs, ${err.message}`
              return of(getTrendySongsFail({ message: errorMessage }))
            })
          );
      })
    );
  });
  loadHistorySongs$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getHistorySongs),
      mergeMap(() => {
        return this.songService
          .getHistory()
          .pipe(
            map((songs) => getHistorySongsSuccess({ songs })),
            catchError( (err: HttpErrorResponse) => {
              const errorMessage = `Can't Load Songs, ${err.message}`
              return of(getHistorySongsFail({ message: errorMessage }))
            })
          );
      })
    );
  });
  loadLikedSongs$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getLikedSongs),
      mergeMap(() => {
        return this.songService
          .getLiked()
          .pipe(
            map((songs) => getLikedSongsSuccess({ songs })),
            catchError( (err: HttpErrorResponse) => {
              const errorMessage = `Can't Load Songs, ${err.message}`
              return of(getLikedSongsFail({ message: errorMessage }))
            })
          );
      })
    );
  });
  loadRecommandedSongs$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getRecommandedSongs),
      mergeMap(() => {
        return this.songService
          .getRecommanded()
          .pipe(
            map((songs) => getRecommandedSongsSuccess({ songs })),
            catchError( (err: HttpErrorResponse) => {
              const errorMessage = `Can't Load Songs, ${err.message}`
              return of(getRecommandedSongsFail({ message: errorMessage }))
            })
          );
      })
    );
  });
}
