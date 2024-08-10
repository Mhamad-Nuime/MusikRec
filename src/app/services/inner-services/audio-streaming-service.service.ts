import { Injectable } from '@angular/core';

@Injectable()
export class AudioStreamingService {
  audio : any =  new Audio();
  constructor(){}
  play(url : any ) {
    this.audio.src = url;
    this.audio.play();
  }
  continue() {
    this.audio.play();
  }
  pause(){
    this.audio.pause();
  }
}