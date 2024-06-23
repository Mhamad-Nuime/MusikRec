import { Component, } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonRippleEffect,
} from '@ionic/angular/standalone';
import { SongService } from 'src/app/services/outer-service/springBootBasedServices/song.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonRippleEffect,
    RouterModule
  ],
  providers: [SongService],
})
export class MainPage {

  constructor() {
  }
}
