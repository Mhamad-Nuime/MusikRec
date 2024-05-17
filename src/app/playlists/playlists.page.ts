import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonImg,
  IonText,
  IonList,
  IonListHeader,
  IonButton,
  IonItem,
  IonLabel,
  IonIcon,
  IonThumbnail,
} from '@ionic/angular/standalone';
import { MediaPlayerAppearanceStateService } from '../services/media-player-appearance-state';
import { addIcons } from 'ionicons';
import { arrowForwardCircle, closeCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.page.html',
  styleUrls: ['./playlists.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonLabel,
    IonItem,
    IonButton,
    IonListHeader,
    IonList,
    IonText,
    IonImg,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonThumbnail,
  ],
})
export class PlaylistsPage {
  constructor(
    private mediaPlayerAppearanceState : MediaPlayerAppearanceStateService
  ){
    addIcons({
      arrowForwardCircle,
      closeCircleOutline,
    });
  }
  playlists = [
    {
      playlist_id: 1,
      playlist_name: 'ionic',
      content: {
        songs: [
          {
            song_id: 10,
            song_name: 'lose your self',
            song_url: 'assets/images/albums/sea-of-cowards.jpg',
          },
          {
            song_id: 13,
            song_name: 'lose your self 14',
            song_url: 'assets/images/albums/sea-of-cowards.jpg',
          },
          {
            song_id: 50,
            song_name: 'lose your self and what is up?',
            song_url: 'assets/images/albums/sea-of-cowards.jpg',
          },
        ],
      },
    },
    {
      playlist_id: 2,
      playlist_name: 'ionic',
      content: {
        songs: [
          {
            song_id: 10,
            song_name: 'lose your self',
            song_url: 'assets/images/albums/houses-of-the-holy.jpg',
          },
        ],
      },
    },
    {
      playlist_id: 3,
      playlist_name: 'ionic',
      content: {
        songs: [
          {
            song_id: 10,
            song_name: 'lose your self',
            song_url: 'assets/images/albums/ex-re.jpg',
          },
        ],
      },
    },
    {
      playlist_id: 4,
      playlist_name: 'ionic',
      content: {
        songs: [
          {
            song_id: 10,
            song_name: 'lose your self',
            song_url: 'assets/images/albums/the-legend-of-mr-rager.jpg',
          },
        ],
      },
    },
    {
      playlist_id: 5,
      playlist_name: 'ionic',
      content: {
        songs: [
          {
            song_id: 10,
            song_name: 'lose your self',
            song_url: 'assets/images/albums/the-creek-drank.jpg',
          },
        ],
      },
    },
    {
      playlist_id: 6,
      playlist_name: 'ionic',
      content: {
        songs: [
          {
            song_id: 10,
            song_name: 'lose your self',
            song_url: 'assets/images/albums/when-we-all-fall-asleep.jpg',
          },
        ],
      },
    },
  ];
  currentPlaylist : any = null;
  displayCurrentPlaylist : boolean = false;
  displayPlaylistContent(playlist : HTMLDivElement): void {
    const desiredPlaylistId : number = Number(playlist.getAttribute('id'));
    this.currentPlaylist = this.playlists.find(
        (playlist) => playlist.playlist_id === desiredPlaylistId
      );
      this.displayCurrentPlaylist = true;
  }
  hideplaylistContent() : void {
    this.displayCurrentPlaylist = false;
    this.currentPlaylist = null;
  }
  playSong() : void {
    this.mediaPlayerAppearanceState.displayMediaPlayer();
  }
}
