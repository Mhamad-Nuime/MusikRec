import { Component } from '@angular/core';
import { IonContent, IonButton, IonRow, IonGrid, IonCol, IonImg, IonText } from "@ionic/angular/standalone";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonText, IonImg,  IonCol, IonGrid, IonRow,  IonButton, IonContent, RouterModule ],
})
export class HomePage {
  constructor() { }
}
