import { Component, EnvironmentInjector, ViewChild, inject} from '@angular/core';
import { addIcons } from 'ionicons';
import { home, homeOutline, search, searchOutline, library, libraryOutline, playCircle, pauseCircle } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonTabs,
  IonIcon,
  IonTabBar,
  IonLabel,
  IonTabButton, IonRow, IonCol, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-content',
  templateUrl: './content.page.html',
  styleUrls: ['./content.page.scss'],
  standalone: true,
  imports: [IonButton, IonCol, IonRow, 
    IonTabButton,
    IonLabel,
    IonTabBar,
    IonIcon,
    IonTabs,
    CommonModule,
    FormsModule,
  ],
})
export class ContentPage {
  public environmentInjector = inject(EnvironmentInjector);
  
  @ViewChild('tabs') tabs!: IonTabs;
  selected : string= '';
  isPaused : boolean = false;
  progress : number = 42;

  constructor() {
    addIcons({ home, homeOutline, search, searchOutline, library, libraryOutline, playCircle, pauseCircle });
  }
  
  setSelectedTabName() {
    this.selected = this.tabs.getSelected() as string;
  }
  pauseOrPlay() : void {
    this.isPaused = !this.isPaused ;
  }
}
