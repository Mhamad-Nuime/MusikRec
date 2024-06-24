import { createFeature, createReducer, on } from "@ngrx/store"
import { getPlaylistsFail, getPlaylistsSuccess } from "./playlists.actions"
import { PlaylistsState } from "./playlists.state"

export const initialState : PlaylistsState = {
  playlists : [],
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
    console.log('get playlist fail reducer');
    return ({
      ...state,
      message : action.message,
    })
  }),
)
export const playlistFeature = createFeature({
  name: 'playlists',
  reducer: playlistReducer
})