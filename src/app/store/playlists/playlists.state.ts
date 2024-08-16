import { Playlist } from "src/app/models/playlist.model";

export interface PlaylistsState {
  playlists: Playlist[] | null | undefined
  message: string | null
}