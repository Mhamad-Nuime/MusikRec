import { Songs } from "src/app/models/song.model";

export interface SongsState {
  historySongs: {
    songs : Songs | null ,
    message: string | null
  } 
  likedSongs: {
    songs : Songs | null ,
    message: string | null
  }
  trendySongs: {
    songs : Songs | null ,
    message: string | null
  }
  recommandedSongs: {
    songs : Songs | null ,
    message: string | null
  }
}