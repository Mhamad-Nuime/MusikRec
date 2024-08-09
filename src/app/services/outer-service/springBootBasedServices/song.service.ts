import { Injectable, inject } from "@angular/core";
import { SpringBootService } from "../spring-boot.service";
import { Songs } from "src/app/models/song.model";
import { Observable, switchMap, take } from "rxjs";
import { Store } from "@ngrx/store";
import { userInfoFeature } from "src/app/store/userAuthentication/user-auth.reducer";

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private springBootService = inject(SpringBootService);
  private store = inject(Store);

  getTrendy() : Observable<Songs> {
    return this.store.select(userInfoFeature.selectId).pipe(
      take(1),
      switchMap(userId => {
        return this.springBootService.getRequest<Songs>('trendy')
      })
    )
  }
  getHistory() : Observable<Songs> {
    return this.store.select(userInfoFeature.selectId).pipe(
      take(1),
      switchMap(userId => {
        return this.springBootService.getRequest<Songs>('histroy');
      })
    )
  }
  getLiked() : Observable<Songs> {
    return this.store.select(userInfoFeature.selectId).pipe(
      take(1),
      switchMap(userId => {
        return this.springBootService.getRequest<Songs>('liked');
      })
    )
  }
  getRecommanded() : Observable<Songs> {
    return this.store.select(userInfoFeature.selectId).pipe(
      take(1),
      switchMap(userId => {
        return this.springBootService.getRequest<Songs>('recommanded');
      })
    )
  }
}