export interface Song {
  id: number | null
  name: string | null 
  artist: string | null
  album: string | null
  imageUrl: string | null
  previewUrl: string | null
}


export type Songs = Song[];