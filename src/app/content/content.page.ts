import { Component, EnvironmentInjector, inject} from '@angular/core';
import { addIcons } from 'ionicons';
import { home, search, library } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonTabs,
  IonIcon,
  IonTabBar,
  IonLabel,
  IonTabButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-content',
  templateUrl: './content.page.html',
  styleUrls: ['./content.page.scss'],
  standalone: true,
  imports: [
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

  constructor() {
    addIcons({ home, search, library });
  }

}
