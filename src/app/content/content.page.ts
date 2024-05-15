import {
  Component,
  ViewChild,
} from '@angular/core';
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
  IonThumbnail, IonText, IonProgressBar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-content',
  templateUrl: './content.page.html',
  styleUrls: ['./content.page.scss'],
  standalone: true,
  imports: [IonProgressBar, IonText, 
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

  constructor() {
    addIcons({
      home,
      homeOutline,
      search,
      searchOutline,
      library,
      libraryOutline,
      playCircle,
      pauseCircle,
    });
  }

  setSelectedTabName() {
    this.selected = this.tabs.getSelected() as string;
  }
  pauseOrPlay(): void {
    this.isPaused = !this.isPaused;
  }
  whenSmallMediaPlayerButtonIsClicked() : void {
    this.pauseOrPlay();
  }
  showMediaPlayer() : void {
    
  }
  seekTo(event: any) {
    const progressBar = event.target;
    const clickPosition = event.clientX - progressBar.getBoundingClientRect().left;
    const totalWidth = progressBar.offsetWidth;
    const percentClicked = (clickPosition / totalWidth) * 100;
  
    const desiredTime = (percentClicked / 100) * this.currentTrackDuration;
  }
}
