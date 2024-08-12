import { Component, } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonRippleEffect, IonButton } from '@ionic/angular/standalone';


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [IonButton, 
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonRippleEffect,
    RouterModule
  ],
})
export class MainPage {

  constructor(
    public router : Router,
  ) {
  }
  logout(){
    this.router.navigateByUrl("");
  }

}
