import { Component, ViewChild } from '@angular/core';
import { addIcons } from 'ionicons';
import {
  home,
  homeOutline,
  search,
  searchOutline,
  library,
  libraryOutline,
  playCircle,
  pauseCircle,
  close,
} from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonTabs,
  IonIcon,
  IonTabBar,
  IonLabel,
  IonTabButton,
  IonRow,
  IonCol,
  IonButton,
  IonItem,
  IonThumbnail,
  IonText,
  IonProgressBar,
  IonRippleEffect, IonActionSheet } from '@ionic/angular/standalone';
import { MediaPlayerAppearanceStateService } from '../../services/inner-services/media-player-appearance-state';
import { OpenActionSheetService } from '../../services/inner-services/open-action-sheet.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getHistorySongs, getLikedSongs, getRecommandedSongs, getTrendySongs } from 'src/app/store/songs/songs.action';
import { getPlaylists } from 'src/app/store/playlists/playlists.actions';
import { AudioStreamingService } from 'src/app/services/inner-services/audio-streaming-service.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.page.html',
  styleUrls: ['./content.page.scss'],
  standalone: true,
  providers: [MediaPlayerAppearanceStateService, OpenActionSheetService , AudioStreamingService],
  imports: [IonActionSheet, 
    IonRippleEffect,
    IonProgressBar,
    IonText,
    IonItem,
    IonButton,
    IonCol,
    IonRow,
    IonTabButton,
    IonLabel,
    IonTabBar,
    IonIcon,
    IonTabs,
    IonThumbnail,
    CommonModule,
    FormsModule,
  ],
})
export class ContentPage {
  @ViewChild('tabs') tabs!: IonTabs;
  selected: string = '';

  openActionSheet: boolean = false ;

  constructor(
    private store : Store,
    public audioStreamingService : AudioStreamingService,
    public mediaPlayerAppearanceState: MediaPlayerAppearanceStateService,
    public openActionSheetService : OpenActionSheetService,
    public router : Router,
  ) {
    addIcons({
      home,
      homeOutline,
      search,
      searchOutline,
      library,
      libraryOutline,
      playCircle,
      pauseCircle,
      close,
    });
    this.store.dispatch(getLikedSongs());
    this.store.dispatch(getHistorySongs());
    this.store.dispatch(getTrendySongs());
    this.store.dispatch(getRecommandedSongs());
    this.store.dispatch(getPlaylists());
  }

  public actionSheetButtons = [
    {
      text: 'Details',
      id: 1,
      handler: (id : number) => {
        this.openActionSheetService.closeActionSheet();
        this.router.navigate(['/content/details', this.openActionSheetService.currentSong.id ]);
      },
    },
    {
      text: 'Save',
      id: 2,
      handler: () => {
        // here we should open the pop that used to add song to a certain popup
      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
      id: 3,
      handler: () => this.openActionSheetService.closeActionSheet(),
    },
  ];

  setSelectedTabName() {
    this.selected = this.tabs.getSelected() as string;
  }
}
