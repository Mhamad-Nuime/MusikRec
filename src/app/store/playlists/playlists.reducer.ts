import { createFeature, createReducer, on } from "@ngrx/store"
import { getPlaylistsFail, getPlaylistsSuccess } from "./playlists.actions"
import { PlaylistsState } from "./playlists.state"

export const initialState : PlaylistsState = {
  playlists : undefined,
  message: null
}
export const playlistReducer = createReducer(
  initialState,
  on(getPlaylistsSuccess, (state, action) => {
    return ({
      ...state,
      ...action
    })
  }),
  on(getPlaylistsFail, (state, action) => {
    return ({
      playlists : null,
      message : action.message,
    })
  }),
)
export const playlistFeature = createFeature({
  name: 'playlists',
  reducer: playlistReducer
});