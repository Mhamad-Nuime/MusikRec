import { Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { addIcons } from 'ionicons';
import {  ellipsisVertical } from 'ionicons/icons';
import { OpenActionSheetService } from '../../../../services/inner-services/open-action-sheet.service';
import { Songs } from 'src/app/models/song.model';
import { Store } from '@ngrx/store';
import { getRecommandedSongs, getTrendySongs } from 'src/app/store/songs/songs.action';
import { songsFeature } from 'src/app/store/songs/songs.reducer';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-trending',
  standalone: true,
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [AsyncPipe]
})
export class TrendingComponent {
  trendy$! : Observable<{songs: Songs | null, message : string | null}>;
  recommanded$! : Observable<{songs: Songs | null, message : string | null}>;
  recommandedSongs : Songs = [];
  constructor(
    private store : Store,
    public openActionSheetService : OpenActionSheetService,
  ) {
    addIcons({
      ellipsisVertical
    });
  this.store.dispatch(getTrendySongs());
  this.store.dispatch(getRecommandedSongs());
  this.trendy$ = this.store.select(songsFeature.selectTrendySongs);
  this.recommanded$ = this.store.select(songsFeature.selectRecommandedSongs);
  }
}