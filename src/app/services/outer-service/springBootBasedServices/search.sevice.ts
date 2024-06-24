import { Injectable, inject } from "@angular/core";
import { SpringBootService } from "../spring-boot.service";
import { Songs } from "src/app/models/song.model";
import { Observable } from "rxjs";

@Injectable()
export class SearchService {
  private springBootService = inject(SpringBootService);
  search(searchTerm : string ) : Observable<Songs>{
    return this.springBootService.getRequest<Songs>('search', {'query' : searchTerm});
  }
}