import { createFeature, createReducer, on } from "@ngrx/store";
import { SongsState } from "./songs.state";
import { getHistorySongsFail, getHistorySongsSuccess, getLikedSongsFail, getLikedSongsSuccess, getRecommandedSongsFail, getRecommandedSongsSuccess, getTrendySongsFail, getTrendySongsSuccess } from "./songs.action";

export const initialState : SongsState = {
  historySongs: {
    songs: [],
    message : null
  },
  likedSongs: {
    songs: [],
    message : null
  },
  trendySongs: {
    songs: [],
    message : null
  },
  recommandedSongs: {
    songs: [],
    message : null
  }
}
export const songsReducer = createReducer(
  initialState,
  on(getHistorySongsSuccess, (state: SongsState, { songs }) => {
    return ({
      ...state,
      historySongs : {
        songs,
        message: null
      },
    })
  }),
  on(getLikedSongsSuccess, (state: SongsState, { songs }) => {
    return ({
      ...state,
      likedSongs : {
        songs,
        message: null
      },
    })
  }),
  on(getTrendySongsSuccess, (state: SongsState, { songs }) => {
    return ({
      ...state,
      trendySongs : {
        songs,
        message: null
      },
    })
  }),
  on(getRecommandedSongsSuccess, (state: SongsState, { songs }) => {
    return ({
      ...state,
      recommandedSongs : {
        songs,
        message: null
      },
    })
  }),
  on(getTrendySongsFail,
    (state, { message }) => {
      return ({
        ...state,
        trendySongs: {
          songs: null,
          message
        }
      })
    }
  ),
  on(getHistorySongsFail,
    (state, { message }) => {
      return ({
        ...state,
        historySongs: {
          songs: null,
          message
        }
      })
    }
  ),
  on(getLikedSongsFail,
    (state, { message }) => {
      return ({
        ...state,
        likedSongs: {
          songs: null,
          message
        }
      })
    }
  ),
  on(getRecommandedSongsFail,
    (state, { message }) => {
      return ({
        ...state,
        recommandedSongs: {
          songs: null,
          message
        }
      })
    }
  )
);
export const songsFeature = createFeature({
  name: 'trendyHistroyLikedRecommandedFeature',
  reducer: songsReducer,
})