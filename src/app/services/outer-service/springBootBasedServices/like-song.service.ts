import { Injectable } from '@angular/core';
import { SpringBootService } from '../spring-boot.service';
import { Store } from '@ngrx/store';
import { userInfoFeature } from 'src/app/store/userAuthentication/user-auth.reducer';
import { concatMap, take } from 'rxjs';

@Injectable()
export class LikeSongService {
  userId$ : any;
  constructor(
    public springBootService: SpringBootService,
    public store: Store
  ) {
    this.userId$ = this.store.select(userInfoFeature.selectId);
  }

  like(songId: string){
    return this.userId$.pipe(
      take(1),
      concatMap((userId) => {
        return this.springBootService.postRequest('likes/add', undefined, {
          "userId": (userId as number).toString(),
          "songId": songId.toString(),
        })
      }
      )
    );
  }
  delete(songId : number){
    return this.springBootService.deleteRequest("likes/delete", { "id" : songId.toString()})
  }
}
