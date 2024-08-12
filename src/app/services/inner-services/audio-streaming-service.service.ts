import { Injectable } from '@angular/core';

@Injectable()
export class AudioStreamingService {
  audio : any =  new Audio();
  constructor(){}
  play(song : any ) {
    this.audio.src = song.previewUrl;
    this.audio.play();
  }
  continue() {
    this.audio.play();
  }
  pause(){
    this.audio.pause();
  }
}