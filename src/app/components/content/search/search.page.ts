import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonCardTitle,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonList,
  IonListHeader,
  IonText,
  IonItem,
  IonImg,
  IonLabel,
  IonButton,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonThumbnail,
} from '@ionic/angular/standalone';
import { MediaPlayerAppearanceStateService } from '../../../services/inner services/media-player-appearance-state';
import { arrowForwardCircle } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [
    RouterModule,
    IonInfiniteScrollContent,
    IonInfiniteScroll,
    IonIcon,
    IonButton,
    IonLabel,
    IonImg,
    IonItem,
    IonText,
    IonListHeader,
    IonList,
    IonCardContent,
    IonCardHeader,
    IonCard,
    IonCardTitle,
    IonSearchbar,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonThumbnail,
  ],
})
export class SearchPage implements OnInit {
  results = [
    { id: 1, title: 'test search song' },
    { id: 2, title: 'test search song' },
    { id: 3, title: 'test search song' },
    { id: 4, title: 'test search song' },
    { id: 5, title: 'test search song' },
    { id: 6, title: 'test search song' },
    { id: 7, title: 'test search song' },
    { id: 8, title: 'test search song' },
    { id: 9, title: 'test search song' },
    { id: 10, title: 'test search song' },
    { id: 11, title: 'test search song' },
    { id: 12, title: 'test search song' },
    { id: 13, title: 'test search song' },
    { id: 14, title: 'test search song' },
    { id: 15, title: 'test search song' },
  ];
  constructor(
    public mediaPlayerAppearanceState: MediaPlayerAppearanceStateService
  ) {
    addIcons({
      arrowForwardCircle,
    });
  }

  ngOnInit() {}

  handleSearchQuery(event: Event): void {
    //calling the service that responsible for resolving the user search query
  }
  playSong(): void {
    this.mediaPlayerAppearanceState.displayMediaPlayer();
  }
}
