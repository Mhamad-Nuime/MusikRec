import { createAction, props } from "@ngrx/store";
import { Playlist } from "src/app/models/playlist.model";

export const getPlaylists = createAction('[ Content Page ] Get All User Playlists');
export const getPlaylistsSuccess = createAction('[ Playlist Api ] Get Successfully All User Playlists',
  props<{playlists: Playlist[]}>()
);
export const getPlaylistsFail = createAction('[ Playlist Api ] Fail To Get All User Playlists',
  props<{message: string}>()
);