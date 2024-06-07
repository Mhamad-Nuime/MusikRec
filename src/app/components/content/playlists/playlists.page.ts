import { Component } from '@angular/core';
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
  IonThumbnail, IonActionSheet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { ellipsisVertical } from 'ionicons/icons';
import { PlaylistComponent } from './playlist/playlist.component';
@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.page.html',
  styleUrls: ['./playlists.page.scss'],
  standalone: true,
  imports: [IonActionSheet, 
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
    PlaylistComponent,
  ],
})
export class PlaylistsPage {
  constructor(){
    addIcons({
      ellipsisVertical,
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

  optionStatus: boolean= false;

  actionSheetButtons= [
  {
    text: 'Delete',
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
  options(status: boolean) : void {
    this.optionStatus = status;
  }
}
