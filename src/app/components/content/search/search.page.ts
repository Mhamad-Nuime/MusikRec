import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonCardTitle,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonList,
  IonListHeader,
  IonText,
  IonItem,
  IonImg,
  IonLabel,
  IonButton,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonThumbnail,
} from '@ionic/angular/standalone';
import { MediaPlayerAppearanceStateService } from '../../../services/inner-services/media-player-appearance-state';
import { arrowForwardCircle } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { SearchService } from 'src/app/services/outer-service/springBootBasedServices/search.sevice';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Observable, debounceTime, distinctUntilChanged, filter, map, retry, startWith, switchMap } from 'rxjs';
import { Songs } from 'src/app/models/song.model';
import { OpenActionSheetService } from 'src/app/services/inner-services/open-action-sheet.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [
    RouterModule,
    IonInfiniteScrollContent,
    IonInfiniteScroll,
    IonIcon,
    IonButton,
    IonLabel,
    IonImg,
    IonItem,
    IonText,
    IonListHeader,
    IonList,
    IonCardContent,
    IonCardHeader,
    IonCard,
    IonCardTitle,
    IonSearchbar,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    ReactiveFormsModule,
    IonThumbnail,
  ],
  providers: [SearchService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SearchPage implements OnInit {
  searchField = new FormControl('');
  results$!: Observable<Songs>;
  constructor(
    private searchService: SearchService,
    public mediaPlayerAppearanceState: MediaPlayerAppearanceStateService,
    public openActionSheetService : OpenActionSheetService,
  ) {
    addIcons({
      arrowForwardCircle,
    });
    this.results$ = this.searchField.valueChanges.pipe(
      map(searchTerm => (searchTerm as string).trim()),
      debounceTime(200),
      distinctUntilChanged(),
      filter(searchTerm => !(["", null].includes(searchTerm))),
      switchMap(searchTerm => this.searchService.search(searchTerm)),
      retry(3),
      startWith([])
    )
  }

  ngOnInit() {}

  playSong(): void {
    this.mediaPlayerAppearanceState.displayMediaPlayer();
  }
}
