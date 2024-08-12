import { Injectable, inject } from '@angular/core';
import { SpringBootService } from '../spring-boot.service';
import { Observable, switchMap, take } from 'rxjs';
import { Playlist } from 'src/app/models/playlist.model';
import { userInfoFeature } from 'src/app/store/userAuthentication/user-auth.reducer';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn : "root",
})
export class PlaylistService {
  private springBootService = inject(SpringBootService);
  private store = inject(Store);
  userId$;
  constructor() {
    this.userId$ = this.store.select(userInfoFeature.selectId);
  }
  getPlaylists(): Observable<Playlist[]> {
    return this.userId$.pipe(
      take(1),
      switchMap((userId) => {
        return this.springBootService.getRequest<Playlist[]>('playlists', {
          'userId ': userId?.toString() as string | string[],
        });
      })
    );
  }
  add(songId: number, playlistId: number) {
    return this.springBootService.postRequest(
      'songs/add-to-playlist',
      undefined,
      { songId: songId.toString(), playlistId: playlistId.toString() }
    );
  }
  create(playlistName: string) {
    return this.userId$.pipe(
      take(1),
      switchMap((userId) => {
        return this.springBootService.postRequest<{userId : string, name: string},Playlist>('playlists/add', {
          userId : (userId?.toString() as string),
          name: playlistName,
        });
      })
    );
  }
  delete(playlistId : number) {
    return this.springBootService.deleteRequest("playlists/delete", {"playlistId" : playlistId.toString()});
  }
}
