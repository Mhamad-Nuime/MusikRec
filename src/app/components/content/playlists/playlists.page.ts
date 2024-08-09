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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PlaylistsState } from 'src/app/store/playlists/playlists.state';
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
  playlists! : Playlist[] | null ;
  playlists$! : Observable<PlaylistsState>;
  // show spinner after refresh
  showSpinnerAfterRefresh : boolean = false;
  constructor(private store : Store,
    public refreshService : RefreshService
  ){
    addIcons({
      ellipsisVertical,
    });
    this.playlists$ = this.store.select(playlistFeature.selectPlaylistsState);
    this.playlists$.pipe(takeUntilDestroyed()).subscribe(p => this.playlists = p.playlists);
  }

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
    this.currentPlaylist = this.playlists?.find(
        (playlist) => playlist.id === desiredPlaylistId
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
  onRefresh() : void {
    this.showSpinnerAfterRefresh = true;
    timer(1000).subscribe(() => this.showSpinnerAfterRefresh = false )
    this.refreshService.refresh();
  }
}
