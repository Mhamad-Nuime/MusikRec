import { Injectable, inject } from "@angular/core";
import { SpringBootService } from "../spring-boot.service";
import { Observable } from "rxjs";
import { Playlist } from "src/app/models/playlist.model";
import { userInfoFeature } from "src/app/store/userAuthentication/user-auth.reducer";
import { Store } from "@ngrx/store";

@Injectable({
  providedIn : 'root'
})
export class PlaylistService {
  private springBootService = inject(SpringBootService);
  private store = inject(Store);
  private userId$ = this.store.select(userInfoFeature.selectId);
  private userId! : number | null ;
  constructor(){
    this.userId$.subscribe(id => this.userId = id);
  }
  getPlaylists() : Observable<Playlist[]>{
    return this.springBootService.getRequest<Playlist[]>('playlist', {'userId' : (this.userId?.toString() || '')});
  }
}