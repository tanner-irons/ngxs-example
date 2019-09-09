import { Injectable } from '@angular/core';
import { MovieSummary } from './movie.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieUpdatesService {

  private _searchResults: Subject<MovieSummary[]>;
  public get searchResults(): Subject<MovieSummary[]> {
    return this._searchResults;
  };

  constructor() {
    this._searchResults = new Subject<MovieSummary[]>();
  }
}
