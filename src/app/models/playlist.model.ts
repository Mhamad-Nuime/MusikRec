import { Songs } from "./song.model"

export interface Playlist {
  id: number
  description: string
  name: string
  songs: Songs
}