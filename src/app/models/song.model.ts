export interface Song {
  id: number | null
  name: string | null 
  artist: string | null
  album: string | null
  image: string | null
  url: string | null
}


export type Songs = Song[];