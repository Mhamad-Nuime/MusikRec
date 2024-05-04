import { Component } from '@angular/core';
import { IonContent, IonButton, IonRow, IonGrid, IonCol } from "@ionic/angular/standalone";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonCol, IonGrid, IonRow,  IonButton, IonContent ],
})
export class HomePage {
  constructor() { }
}
