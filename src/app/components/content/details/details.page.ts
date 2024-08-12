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
import { OpenActionSheetService } from 'src/app/services/inner-services/open-action-sheet.service';

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
export class DetailsPage{
  song : any ;

  constructor(public openActionSheetService : OpenActionSheetService) {
    this.song = this.openActionSheetService.currentSong;
  }


}
