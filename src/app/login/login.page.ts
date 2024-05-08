import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonRow,
  IonInput,
  IonCol,
  IonGrid,
  IonButton,
  IonIcon,
  IonText,
  IonFab,
  IonFabButton,
  IonButtons,
  IonBackButton,
  IonImg,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonImg,
    IonBackButton,
    IonButtons,
    IonFabButton,
    IonFab,
    IonText,
    IonIcon,
    IonButton,
    IonGrid,
    IonCol,
    IonInput,
    IonRow,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterModule,
  ],
})
export class LoginPage implements OnInit {
  mailIconHidden: boolean = false;
  passwordAppeared: boolean = false;

  constructor() {}

  ngOnInit() {}

  onEmailInput(): void {
    this.mailIconHidden = true;
  }
  onShowPassword(): void {
    this.passwordAppeared = !this.passwordAppeared;
  }
}
