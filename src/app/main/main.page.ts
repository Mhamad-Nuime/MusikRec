import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonRippleEffect,
} from '@ionic/angular/standalone';
import {
  arrowForwardCircle
} from 'ionicons/icons'

import recentlyPlayed from '../../assets/mockdata/recentlyPlayed.json';
import heavyRotation from '../../assets/mockdata/heavyRotation.json';
import jumpBackIn from '../../assets/mockdata/jumpBackIn.json';
import { addIcons } from 'ionicons';
import { MediaPlayerAppearanceStateService } from '../services/media-player-appearance-state';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonButton,
    IonCol,
    IonRow,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonRippleEffect,
    CommonModule,
    FormsModule,
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainPage implements OnInit {
  songs = recentlyPlayed;
  lastSeensSongs = heavyRotation;
  constructor(
    public mediaPlayerAppearanceState : MediaPlayerAppearanceStateService
  ) {
    addIcons({
      arrowForwardCircle
    });
  }

  ngOnInit() {
  }

  data = [
    {
      title: 'Recently played',
      albums: recentlyPlayed,
    },
    {
      title: 'Heavy rotation',
      albums: heavyRotation,
    },
    {
      title: 'Jump back in',
      albums: jumpBackIn,
    },
  ];
    // Helper function for image names
    dasherize(string: string) {
      return string.replace(/[A-Z]/g, function(char, index) {
        return (index !== 0 ? '-' : '') + char.toLowerCase();
      });
    };
  playSong() : void {
    this.mediaPlayerAppearanceState.displayMediaPlayer();
  }
}
