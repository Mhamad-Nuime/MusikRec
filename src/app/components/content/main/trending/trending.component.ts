import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy} from '@angular/core';
import { addIcons } from 'ionicons';
import { ellipsisVertical } from 'ionicons/icons';
import { OpenActionSheetService } from '../../../../services/inner-services/open-action-sheet.service';
import { Songs } from 'src/app/models/song.model';
import { Store } from '@ngrx/store';
import { songsFeature } from 'src/app/store/songs/songs.reducer';
import { Observable, timer } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import {IonRippleEffect} from '@ionic/angular/standalone';
import { RefreshService } from 'src/app/services/inner-services/refresh.service';
import { AudioStreamingService } from 'src/app/services/inner-services/audio-streaming-service.service';
import { MediaPlayerAppearanceStateService } from 'src/app/services/inner-services/media-player-appearance-state';
import { AddToHistoryService } from 'src/app/services/outer-service/springBootBasedServices/add-to-history.service';
import { getHistorySongs } from 'src/app/store/songs/songs.action';
@Component({
  selector: 'app-trending',
  standalone: true,
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [AsyncPipe, IonRippleEffect],
})
export class TrendingComponent implements OnDestroy{
  trendy$! : Observable<{songs: Songs | null, message : string | null}>;
  recommanded$! : Observable<{songs: Songs | null, message : string | null}>;
  recommandedSongs : Songs = [];
  sub : any;
  // show spinner after refresh
  showSpinnerAfterRefresh : boolean = false;
  constructor(
    private store : Store,
    public openActionSheetService : OpenActionSheetService,
    public refreshService : RefreshService,
    public audioStreamingService : AudioStreamingService,
    public mediaPlayer:  MediaPlayerAppearanceStateService,
    public addToHistoryService : AddToHistoryService,
  ) {
    addIcons({
      ellipsisVertical
    });
  this.trendy$ = this.store.select(songsFeature.selectTrendySongs);
  this.recommanded$ = this.store.select(songsFeature.selectRecommandedSongs);
  }
  ngOnDestroy(): void {
    if(this.sub){
    this.sub.unsubscribe();
    }
  }
  onRefresh() : void {
    this.showSpinnerAfterRefresh = true;
    timer(1000).subscribe(() => this.showSpinnerAfterRefresh = false )
    this.refreshService.refresh();
  }
  playSong(song : any) {
    this.mediaPlayer.displayMediaPlayer(song);
    this.audioStreamingService.play(song);
    this.sub = this.addToHistoryService.add(song.id).subscribe(() =>this.store.dispatch(getHistorySongs()));
  }
}