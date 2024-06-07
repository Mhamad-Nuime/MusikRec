import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class MediaPlayerAppearanceStateService {
  private mediaplayerState$ = new BehaviorSubject(false);
  getMediaPlayerAppearanceState() : Observable<boolean> {
    return this.mediaplayerState$;
  }
  displayMediaPlayer() : void {
    this.mediaplayerState$.next(true);
  }
  hideMediaPlayer() : void {
    this.mediaplayerState$.next(false);
  }
}
