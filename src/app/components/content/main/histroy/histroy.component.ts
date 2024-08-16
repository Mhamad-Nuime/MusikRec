import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Songs } from 'src/app/models/song.model';
import { songsFeature } from 'src/app/store/songs/songs.reducer';
import {
  IonList,
  IonImg,
  IonIcon,
  IonItem,
  IonButton,
  IonLabel,
  IonThumbnail, IonText, IonSpinner, IonRippleEffect } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {  ellipsisVertical } from 'ionicons/icons';
import { OpenActionSheetService } from 'src/app/services/inner-services/open-action-sheet.service';
import { Observable, timer } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RefreshService } from 'src/app/services/inner-services/refresh.service';
import { AudioStreamingService } from 'src/app/services/inner-services/audio-streaming-service.service';
import { MediaPlayerAppearanceStateService } from 'src/app/services/inner-services/media-player-appearance-state';

@Component({
  selector: 'app-histroy',
  standalone: true,
  templateUrl: './histroy.component.html',
  styleUrls: ['./histroy.component.scss'],
  imports: [IonRippleEffect, IonSpinner, IonText, 
    AsyncPipe,
    IonList,
    IonImg,
    IonIcon,
    IonItem,
    IonButton,
    IonLabel,
    IonThumbnail,
  ],
})
export class HistroyComponent{
  // show or hide loading spinner 
  showSpinnerAfterRefresh : boolean = false;
  historySongs$! : Observable<{songs: Songs | null | undefined, message : string | null}>;
  constructor(private store: Store,
    public openActionSheetService : OpenActionSheetService,
    public refreshService : RefreshService,
    public audioStreamingService : AudioStreamingService,
    public mediaPlayer:  MediaPlayerAppearanceStateService,
  ) {
    addIcons({
      ellipsisVertical
    });
    this.historySongs$ = this.store.select(songsFeature.selectHistorySongs);;
  }
  onRefresh() : void {
    this.showSpinnerAfterRefresh = true;
    timer(1000).subscribe(() => this.showSpinnerAfterRefresh = false )
    this.refreshService.refresh();
  }
  playSong(song : any) {
    this.mediaPlayer.displayMediaPlayer(song);
    this.audioStreamingService.play(song);
  }
}
