import { inject, Injectable } from '@angular/core';
import { SpringBootService } from '../spring-boot.service';

@Injectable({
  providedIn: 'root'
})
export class AddToHistoryService {
  private springService = inject(SpringBootService);
  add(songId : number) {
    return this.springService.getRequest("songs/history/new", { "songId" : songId.toString()} );
  }
}