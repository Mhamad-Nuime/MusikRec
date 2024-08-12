import { Component, ViewChild } from '@angular/core';
import { addIcons } from 'ionicons';
import {
  home,
  homeOutline,
  search,
  searchOutline,
  library,
  libraryOutline,
  playCircle,
  pauseCircle,
  close,
} from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonTabs,
  IonIcon,
  IonTabBar,
  IonLabel,
  IonTabButton,
  IonRow,
  IonCol,
  IonButton,
  IonItem,
  IonThumbnail,
  IonText,
  IonProgressBar,
  IonRippleEffect,
  IonActionSheet,
  IonCardTitle,
  IonCardSubtitle,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonRadioGroup,
  IonList,
  IonRadio,
  IonInput,
} from '@ionic/angular/standalone';
import { MediaPlayerAppearanceStateService } from '../../services/inner-services/media-player-appearance-state';
import { OpenActionSheetService } from '../../services/inner-services/open-action-sheet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  getHistorySongs,
  getLikedSongs,
  getRecommandedSongs,
  getTrendySongs,
} from 'src/app/store/songs/songs.action';
import { getPlaylists } from 'src/app/store/playlists/playlists.actions';
import { AudioStreamingService } from 'src/app/services/inner-services/audio-streaming-service.service';
import { LikeSongService } from 'src/app/services/outer-service/springBootBasedServices/like-song.service';
import { timer } from 'rxjs';
import { AddToHistoryService } from 'src/app/services/outer-service/springBootBasedServices/add-to-history.service';
import { playlistFeature } from 'src/app/store/playlists/playlists.reducer';
import { PlaylistService } from 'src/app/services/outer-service/springBootBasedServices/playlist.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.page.html',
  styleUrls: ['./content.page.scss'],
  standalone: true,
  providers: [
    MediaPlayerAppearanceStateService,
    OpenActionSheetService,
    AudioStreamingService,
    LikeSongService,
    AddToHistoryService,
  ],
  imports: [
    IonInput,
    IonRadio,
    IonList,
    IonRadioGroup,
    IonCardContent,
    IonCardHeader,
    IonCard,
    IonCardSubtitle,
    IonCardTitle,
    IonActionSheet,
    IonRippleEffect,
    IonProgressBar,
    IonText,
    IonItem,
    IonButton,
    IonCol,
    IonRow,
    IonTabButton,
    IonLabel,
    IonTabBar,
    IonIcon,
    IonTabs,
    IonThumbnail,
    CommonModule,
    FormsModule,
  ],
})
export class ContentPage {
  @ViewChild('tabs') tabs!: IonTabs;
  selected: string = '';
  isPaused: boolean = false;
  openActionSheet: boolean = false;
  successMessage: string | null = null;
  failMessage: string | null = null;
  playlists$;
  displayPlaylistAddingCreatingPopup: boolean = false;
  displayCreatePlaylistPopup: boolean = false;
  displaySelectPlaylist: boolean = false;
  nameOfCreatedPlaylist: string = '';
  currentUrl: string ='';
  constructor(
    private store: Store,
    public audioStreamingService: AudioStreamingService,
    public mediaPlayerAppearanceState: MediaPlayerAppearanceStateService,
    public openActionSheetService: OpenActionSheetService,
    public likeSongService: LikeSongService,
    public playlistService: PlaylistService,
    public router: Router,
    public activatedRoute : ActivatedRoute,
  ) {
    addIcons({
      home,
      homeOutline,
      search,
      searchOutline,
      library,
      libraryOutline,
      playCircle,
      pauseCircle,
      close,
    });
    this.store.dispatch(getLikedSongs());
    this.store.dispatch(getHistorySongs());
    this.store.dispatch(getTrendySongs());
    this.store.dispatch(getRecommandedSongs());
    this.store.dispatch(getPlaylists());
    this.playlists$ = this.store.select(playlistFeature.selectPlaylists);
  }

  public actionSheetButtons = [
    {
      text: 'Details',
      id: 1,
      handler: (id: number) => {
        this.openActionSheetService.closeActionSheet();
        this.router.navigate([
          '/content/details',
          this.openActionSheetService.currentSong.id,
        ]);
      },
    },
    {
      text: "Like",
      id: 2,
      handler: () => {
        console.log(this.router.url === "/content/main/liked");
        if(this.router.url !== "/content/main/liked"){
          this.likeSongService
            .like(this.openActionSheetService.currentSong.id)
            .subscribe({
              next: () => {
                this.successMessage = 'Add to liked list';
                timer(2000).subscribe(() => (this.successMessage = ''));
                setTimeout(() => this.store.dispatch(getLikedSongs()), 1000);
              },
              error: () => {
                this.failMessage = 'Fail to add the song to liked list';
                timer(2000).subscribe(() => (this.failMessage = ''));
              },
            });
        } else {
          this.likeSongService
          .delete(this.openActionSheetService.currentSong.id)
          .subscribe({
            next: () => {
              this.successMessage = 'delete from liked list';
              timer(2000).subscribe(() => (this.successMessage = ''));
              setTimeout(() => this.store.dispatch(getLikedSongs()), 1000);
            },
            error: () => {
              this.failMessage = 'Fail to delete the song from liked list';
              timer(2000).subscribe(() => (this.failMessage = ''));
            },
          });
        }

        this.openActionSheetService.closeActionSheet();
      },
    },
    {
      text: 'Save',
      id: 3,
      handler: () => {
        this.displayPlaylistAddingCreatingPopup = true;
        this.displaySelectPlaylist=true;
        this.openActionSheetService.closeActionSheet();
      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
      id: 4,
      handler: () => this.openActionSheetService.closeActionSheet(),
    },
  ];

  setSelectedTabName() {
    this.selected = this.tabs.getSelected() as string;
  }
  playOrPause(): void {
    if (this.isPaused) {
      this.audioStreamingService.continue();
    } else {
      this.audioStreamingService.pause();
    }
    this.isPaused = !this.isPaused;
  }
  closeMediaPlayer() {
    this.audioStreamingService.pause();
    this.mediaPlayerAppearanceState.hideMediaPlayer();
  }
  addToPlaylist(e: any) {
    this.displayPlaylistAddingCreatingPopup = false;
    this.displaySelectPlaylist = false;
    const playlist = e.target.value;
    if (playlist) {
      this.playlistService
        .add(this.openActionSheetService.currentSong.id, playlist.id)
        .subscribe({
          next: () => {
            this.successMessage = `Adding to ${playlist.name} playlist is succeded`;
            timer(2000).subscribe(() => (this.successMessage = ''));
            setTimeout(() => this.store.dispatch(getPlaylists()), 1000);
          },
          error: () => {
            this.failMessage = `Adding to ${playlist.name} playlist is Fail`;
            timer(2000).subscribe(() => (this.failMessage = ''));
          },
        });
    }
  }
  closePlaylistPopup() {
    this.displayPlaylistAddingCreatingPopup = false;
    this.displaySelectPlaylist= false;
  }
  showCreatePlaylistPopup() {
    this.displayCreatePlaylistPopup = true;
    this.displaySelectPlaylist = false;
  }
  hideCreatePlaylistPopup() {
    this.displayCreatePlaylistPopup = false;
    this.displayPlaylistAddingCreatingPopup = false;
  }
  hideBothCreateAndSelectPlaylistPopup() {
    this.displayCreatePlaylistPopup = false;
    this.displayPlaylistAddingCreatingPopup = false;
  }
  createNewPlaylist() {
    this.hideBothCreateAndSelectPlaylistPopup();
    this.playlistService.create(this.nameOfCreatedPlaylist).subscribe({
      next: (playlist) => {
        this.successMessage = `creating ${playlist.name} playlist is succeded`;
        timer(2000).subscribe(() => (this.successMessage = ''));
        this.playlistService
          .add(this.openActionSheetService.currentSong.id, playlist.id)
          .subscribe({
            next: () => {
              this.successMessage = `add to ${playlist.name} playlist is succeded`;
              timer(2000).subscribe(() => (this.successMessage = ''));
            },
            error: () => {
              this.failMessage = `creating to ${playlist.name} playlist is Fail`;
              timer(2000).subscribe(() => (this.failMessage = ''));
            },
          });
      },
      error: () => {
        this.failMessage = `creating playlist is Fail`;
        timer(2000).subscribe(() => (this.failMessage = ''));
      },
    });
  }
}
