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
import { MediaPlayerAppearanceStateService } from '../../services/inner services/media-player-appearance-state';
import { OpenActionSheetService } from '../../services/inner services/open-action-sheet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.page.html',
  styleUrls: ['./content.page.scss'],
  standalone: true,
  providers: [MediaPlayerAppearanceStateService, OpenActionSheetService],
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
  isPaused: boolean = false;
  currentTrackDuration: number = 42;

  openActionSheet: boolean = false ;

  constructor(
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
    this.openActionSheetService.isActionSheetOpen().subscribe( isOpen => {
      this.openActionSheet = isOpen;
    })
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
  pauseOrPlay(): void {
    this.isPaused = !this.isPaused;
  }
  whenSmallMediaPlayerButtonIsClicked(): void {
    this.pauseOrPlay();
  }
  seekTo(event: any) {
    const progressBar = event.target;
    const clickPosition =
      event.clientX - progressBar.getBoundingClientRect().left;
    const totalWidth = progressBar.offsetWidth;
    const percentClicked = (clickPosition / totalWidth) * 100;

    const desiredTime = (percentClicked / 100) * this.currentTrackDuration;
  }
}
