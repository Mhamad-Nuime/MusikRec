import { Component, OnInit } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonCol,
  IonRow,
  IonIcon, IonButton, IonButtons } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowForward } from 'ionicons/icons';
import { ActivatedRoute } from '@angular/router';
import albums from '../../../../assets/mockdata/albums/bornToDie.json';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonButtons, IonButton, 
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonBackButton,
    IonCol,
    IonRow,
    IonIcon,
  ],
})
export class DetailsPage implements OnInit {
  data = albums;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {}

  // Helper function for image names
  dasherize(string: string) {
    return string.replace(/[A-Z]/g, function (char: string, index: number) {
      return (index !== 0 ? '-' : '') + char.toLowerCase();
    });
  }
}
