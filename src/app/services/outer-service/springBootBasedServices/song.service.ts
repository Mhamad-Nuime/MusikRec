import { Injectable, inject } from "@angular/core";
import { SpringBootService } from "../spring-boot.service";
import { Songs } from "src/app/models/song.model";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { userInfoFeature } from "src/app/store/userAuthentication/user-auth.reducer";

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private springBootService = inject(SpringBootService);
  private store = inject(Store);
  private userId! : number | null;
  constructor(){
    this.store.select(userInfoFeature.selectId).subscribe(userId => this.userId = userId);
  }

  getTrendy() : Observable<Songs> {
    const trendySongs$ = this.springBootService.getRequest<Songs>('trendy' , {"userId" : (this.userId?.toString() || '')});
    return trendySongs$;
  }
  getHistory() : Observable<Songs> {
    const historySongs$ = this.springBootService.getRequest<Songs>('histroy' , {"userId" : (this.userId?.toString() || '')});
    return historySongs$;
  }
  getLiked() : Observable<Songs> {
    const likedSongs$ = this.springBootService.getRequest<Songs>('liked' , {"userId" : (this.userId?.toString() || '')});
    return likedSongs$;
  }
  getRecommanded() : Observable<Songs> {
    const recommandedSongs$ = this.springBootService.getRequest<Songs>('recommanded' , {"userId" : (this.userId?.toString() || '')});
    return recommandedSongs$;
  }
}