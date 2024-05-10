import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';


import recentlyPlayed from '../../assets/mockdata/recentlyPlayed.json';
import heavyRotation from '../../assets/mockdata/heavyRotation.json';
import jumpBackIn from '../../assets/mockdata/jumpBackIn.json';
import { SwiperContainer } from 'swiper/element';

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
    CommonModule,
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainPage implements OnInit {
  songs = recentlyPlayed;
  lastSeensSongs = heavyRotation;
  constructor() {}

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
}
