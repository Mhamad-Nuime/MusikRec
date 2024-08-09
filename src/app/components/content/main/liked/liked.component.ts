import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Songs } from 'src/app/models/song.model';
import { getLikedSongs } from 'src/app/store/songs/songs.action';
import { songsFeature } from 'src/app/store/songs/songs.reducer';
import {
  IonList,
  IonImg,
  IonIcon,
  IonItem,
  IonButton,
  IonLabel,
  IonThumbnail, IonRippleEffect, IonText, IonSpinner } from '@ionic/angular/standalone';
import { OpenActionSheetService } from 'src/app/services/inner-services/open-action-sheet.service';
import { addIcons } from 'ionicons';
import {  ellipsisVertical } from 'ionicons/icons';
import { Observable, timer } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RefreshService } from 'src/app/services/inner-services/refresh.service';

@Component({
  selector: 'app-liked',
  standalone: true,
  templateUrl: './liked.component.html',
  styleUrls: ['./liked.component.scss'],
  imports: [IonSpinner, IonText, IonRippleEffect, 
    AsyncPipe,
    IonList,
    IonImg,
    IonIcon,
    IonItem,
    IonButton,
    IonLabel,
    IonThumbnail,
  ],
})
export class LikedComponent {
  liked$! : Observable<{songs: Songs | null, message : string | null}>;
  // show or hide loading spinner
  showSpinnerAfterRefresh : boolean = false ;
  constructor(private store: Store,
    public openActionSheetService : OpenActionSheetService,
    public refreshService : RefreshService,
  ) {
    addIcons({
      ellipsisVertical
    });
    this.liked$ = this.store.select(songsFeature.selectLikedSongs);
  }
  onRefresh() : void {
    this.showSpinnerAfterRefresh = true;
    timer(1000).subscribe(() => this.showSpinnerAfterRefresh = false )
    this.refreshService.refresh();
  }
}
