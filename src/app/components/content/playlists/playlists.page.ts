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
  IonThumbnail, IonActionSheet, IonCard, IonCardHeader, IonSpinner, IonRippleEffect } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { ellipsisVertical } from 'ionicons/icons';
import { PlaylistComponent } from './playlist/playlist.component';
import { Playlist } from 'src/app/models/playlist.model';
import { playlistFeature } from 'src/app/store/playlists/playlists.reducer';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { RefreshService } from 'src/app/services/inner-services/refresh.service';
import { Observable, takeUntil, timer } from 'rxjs';
import { PlaylistService } from 'src/app/services/outer-service/springBootBasedServices/playlist.service';
import { getLikedSongs } from 'src/app/store/songs/songs.action';
import { getPlaylists } from 'src/app/store/playlists/playlists.actions';
@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.page.html',
  styleUrls: ['./playlists.page.scss'],
  standalone: true,
  imports: [IonRippleEffect, IonSpinner, IonCardHeader, IonCard, IonActionSheet, 
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
    AsyncPipe
  ],
})
export class PlaylistsPage {
  playlists$! : Observable<any>;
  // show spinner after refresh
  showSpinnerAfterRefresh : boolean = false;
  constructor(private store : Store,
    public refreshService : RefreshService,
    public playlistService : PlaylistService,
  ){
    addIcons({
      ellipsisVertical,
    });
    this.playlists$ = this.store.select(playlistFeature.selectPlaylists);
  }

  currentPlaylist : any = null;
  displayCurrentPlaylist : boolean = false;
  playlistForActionSheet! : Playlist;
  optionStatus: boolean= false;
  successMessage: string | null = null;
  failMessage: string | null = null;
  actionSheetButtons= [
  {
    text: 'Delete',
    id: 1,
    handler: () => {
      this.options(false);
      this.playlistService.delete(this.playlistForActionSheet.id).subscribe({
        next: (res : {message : string}) => {
          this.successMessage = res.message;
          timer(1000).subscribe(() => (this.successMessage = ''));
          setTimeout(() => this.store.dispatch(getPlaylists()), 1000);
        },
        error: () => {
          this.failMessage = "Fail to Delete Playlist";
          timer(1000).subscribe(() => (this.failMessage = ''));
        }
      });
    }
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
    this.playlists$.subscribe( (playlists) => {
      if(playlists){
        this.currentPlaylist = (playlists).find(
          (p : Playlist) => p.id === desiredPlaylistId
        );
        this.displayCurrentPlaylist = true;
      }
    });
  }
  
  hideplaylistContent() : void {
    this.displayCurrentPlaylist = false;
    this.currentPlaylist = null;
  }
  options(status: boolean, playlist? : Playlist) : void {
    this.optionStatus = status;
    if(playlist){
      this.playlistForActionSheet = playlist;
    }
  }
  onRefresh() : void {
    this.showSpinnerAfterRefresh = true;
    timer(1000).subscribe(() => this.showSpinnerAfterRefresh = false )
    this.refreshService.refresh();
  }
}
