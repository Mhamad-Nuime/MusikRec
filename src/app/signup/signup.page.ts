import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonInput,
  IonCol,
  IonIcon,
  IonText,
  IonButton,
  IonFab,
  IonFabButton,
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [
    IonFabButton,
    IonFab,
    IonButton,
    IonText,
    IonIcon,
    IonCol,
    IonInput,
    IonRow,
    IonGrid,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterModule,
  ],
})
export class SignupPage implements OnInit {
  mailIconHidden: boolean = false;

  constructor() {}

  ngOnInit() {}

  onEmailInput(): void {
    this.mailIconHidden = true;
  }
}
