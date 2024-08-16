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
import { PlaylistService } from 'src/app/services/outer-service/springBootBasedServices/playlist.service';
import { timer } from 'rxjs';
import { getPlaylists } from 'src/app/store/playlists/playlists.actions';
import { Store } from '@ngrx/store';

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
  currentSong : any ;
  optionStatus: boolean = false;
  successMessage: string | null = null;
  failMessage: string | null = null;

  constructor(private store : Store,
    public audioStreamingService : AudioStreamingService,
    public mediaPlayer:  MediaPlayerAppearanceStateService,
    public playlistService : PlaylistService,
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
      handler: () => {
        this.playlistService.removeSongFromPlaylist(this.currentSong.id, this.playlist.id).subscribe({
          next: () => {
            this.successMessage = "song was deleted";
            timer(1000).subscribe(() => (this.successMessage = ''));
            setTimeout(() => this.store.dispatch(getPlaylists()), 1000);
          },
          error: () => {
            this.failMessage = "Fail to Delete song";
            timer(1000).subscribe(() => (this.failMessage = ''));
          }
        })
        this.optionStatus = false;
      }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        id: 2,
        handler: () => this.optionStatus = false,
      }
    ];
  backToPlaylistsPage() : void {
    this.backEvent.emit();
  }
  options(song : any) : void {
    this.optionStatus = true;
    this.currentSong = song;
  }
  playSong(song : any) {
    this.mediaPlayer.displayMediaPlayer(song);
    this.audioStreamingService.play(song);
  }
}
