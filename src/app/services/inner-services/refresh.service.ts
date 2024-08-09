import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getPlaylists } from 'src/app/store/playlists/playlists.actions';
import { getHistorySongs, getLikedSongs, getRecommandedSongs, getTrendySongs } from 'src/app/store/songs/songs.action';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {

  constructor(private store : Store) {}

  refresh() : void {
    this.store.dispatch(getLikedSongs());
    this.store.dispatch(getHistorySongs());
    this.store.dispatch(getTrendySongs());
    this.store.dispatch(getRecommandedSongs());
    this.store.dispatch(getPlaylists());
  }
}
