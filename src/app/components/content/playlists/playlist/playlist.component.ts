import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  IonList,
  IonListHeader,
  IonToolbar,
  IonText,
  IonButton,
  IonIcon,
  IonItem,
  IonImg,
  IonLabel,
  IonThumbnail, IonTitle, IonActionSheet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowForward, ellipsisVertical } from 'ionicons/icons';
import { MediaPlayerAppearanceStateService } from '../../../../services/inner-services/media-player-appearance-state';
import { AudioStreamingService } from 'src/app/services/inner-services/audio-streaming-service.service';
import { Playlist } from 'src/app/models/playlist.model';

@Component({
  selector: 'app-playlist',
  standalone: true,
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
  imports: [IonActionSheet, IonTitle, 
    IonList,
    IonListHeader,
    IonToolbar,
    IonText,
    IonButton,
    IonIcon,
    IonItem,
    IonImg,
    IonLabel,
    IonThumbnail,
  ],
})
export class PlaylistComponent{
  @Input({ required: true }) playlist!: Playlist;
  @Output() backEvent = new EventEmitter<never>();

  optionStatus: boolean = false;

  constructor(
    public audioStreamingService : AudioStreamingService,
    public mediaPlayer:  MediaPlayerAppearanceStateService,
  ){
    addIcons({
      ellipsisVertical,
      arrowForward,
    });
  }

  actionSheetButtons= [
    {
      text: 'Remove',
      id: 1,
      handler: () => {}
      },
      {
        text: 'Cancel',
        role: 'cancel',
        id: 2,
        handler: () => this.options(false)
      }
    ];
  backToPlaylistsPage() : void {
    this.backEvent.emit();
  }
  options(status: boolean) : void {
    this.optionStatus = status;
  }
  playSong(song : any) {
    this.mediaPlayer.displayMediaPlayer(song);
    this.audioStreamingService.play(song);
  }
}
