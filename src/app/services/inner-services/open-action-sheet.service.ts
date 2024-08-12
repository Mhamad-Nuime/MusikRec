import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class OpenActionSheetService {
  public currentSong : any = {};
  private actionSheetState = new BehaviorSubject<boolean>(false);
  openActionSheet(song: any) : void {
    this.currentSong = song;
    this.actionSheetState.next(true);
  }
  closeActionSheet() : void {
    this.actionSheetState.next(false);
  }
  isActionSheetOpen() : Observable<boolean> {
    return this.actionSheetState;
  }
}

