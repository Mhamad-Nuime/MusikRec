import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonButtons,
  IonBackButton,
  IonCol,
  IonRow,
  IonButton,
  IonIcon,
  IonList,
  IonLabel,
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { ImageFadeDirective } from '../image-fade.directive';
import albums from '../../assets/mockdata/albums/bornToDie.json';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [
    IonLabel,
    IonList,
    IonIcon,
    IonButton,
    IonRow,
    IonCol,
    IonBackButton,
    IonButtons,
    IonItem,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ImageFadeDirective,
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
