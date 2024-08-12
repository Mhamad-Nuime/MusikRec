import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class MediaPlayerAppearanceStateService {
  private mediaplayerState$ = new BehaviorSubject({show : false , song : null});
  getMediaPlayerAppearanceState() : Observable<{show : boolean, song : any}> {
    return this.mediaplayerState$;
  }
  displayMediaPlayer(s : any) : void {
    this.mediaplayerState$.next({show: true, song : s });
  }
  hideMediaPlayer() : void {
    this.mediaplayerState$.next({show: false, song : null});
  }
}
