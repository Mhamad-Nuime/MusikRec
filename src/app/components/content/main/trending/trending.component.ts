import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { MediaPlayerAppearanceStateService } from '../../../../services/inner services/media-player-appearance-state';
import recentlyPlayed from '../../../../../assets/mockdata/recentlyPlayed.json';
import { addIcons } from 'ionicons';
import {  ellipsisVertical } from 'ionicons/icons';
import { OpenActionSheetService } from '../../../../services/inner services/open-action-sheet.service';
@Component({
  selector: 'app-trending',
  standalone: true,
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TrendingComponent  implements OnInit {
  songs = recentlyPlayed;
  constructor(
    public mediaPlayerAppearanceState : MediaPlayerAppearanceStateService,
    public openActionSheetService : OpenActionSheetService,
  ) {
    addIcons({
      ellipsisVertical
    });
  }

  data = [
    {
      title: 'Recently played',
      albums: recentlyPlayed,
    },
  ];
  dasherize(string: string) {
    return string.replace(/[A-Z]/g, function(char, index) {
      return (index !== 0 ? '-' : '') + char.toLowerCase();
    });
  }
  ngOnInit() {}

  playSong() : void {
    this.mediaPlayerAppearanceState.displayMediaPlayer();
  }
}
