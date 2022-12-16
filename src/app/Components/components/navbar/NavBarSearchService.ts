import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavBarSearchService {
    any:any= null
  searchSource = new BehaviorSubject<string>(this.any);
  search$ = this.searchSource.asObservable();
  constructor() { }
}
