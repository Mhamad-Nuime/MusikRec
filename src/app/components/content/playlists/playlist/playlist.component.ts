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
import { MediaPlayerAppearanceStateService } from '../../../../services/inner services/media-player-appearance-state';

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
export class PlaylistComponent implements OnInit {
  @Input({ required: true }) playlist: any;
  @Output('backEvent') backButton = new EventEmitter<never>();

  optionStatus: boolean = false;

  constructor(
    private mediaPlayerAppearanceState : MediaPlayerAppearanceStateService
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

  ngOnInit() {}
  playSong() : void {
    this.mediaPlayerAppearanceState.displayMediaPlayer();
  }
  backToPlaylistsPage() : void {
    this.backButton.emit();
  }
  options(status: boolean) : void {
    this.optionStatus = status;
  }
}
