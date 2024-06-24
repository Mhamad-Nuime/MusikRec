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
  IonThumbnail,
} from '@ionic/angular/standalone';
import { OpenActionSheetService } from 'src/app/services/inner-services/open-action-sheet.service';
import { addIcons } from 'ionicons';
import {  ellipsisVertical } from 'ionicons/icons';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-liked',
  standalone: true,
  templateUrl: './liked.component.html',
  styleUrls: ['./liked.component.scss'],
  imports: [
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
  constructor(private store: Store,
    public openActionSheetService : OpenActionSheetService,
  ) {
    addIcons({
      ellipsisVertical
    });
    this.liked$ = this.store.select(songsFeature.selectLikedSongs);
  }
}
