import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private favoriteIds: Set<string> = new Set();
  private favoritesListeners: ((favs: string[]) => void)[] = [];

  private filter: string = 'all';
  private filterListeners: ((filter: string) => void)[] = [];

  constructor() {
    let favoriteIDList: string[] = JSON.parse(localStorage.getItem('favoriteMovieIds'));
    this.favoriteIds = new Set(favoriteIDList);
  }

  public newFavorite(id: string) {
    this.favoriteIds.add(id);
    let tmpArray = Array.from(this.favoriteIds.values());
    localStorage.setItem('favoriteMovieIds', JSON.stringify(tmpArray));
    for (let listener of this.favoritesListeners) {
      listener(tmpArray);
    }
  }

  public setFilter(filter: string) {
    this.filter = filter;
    for (let listener of this.filterListeners) {
      listener(filter);
    }
  }

  public getFavorites(): Set<string> {
    return this.favoriteIds;
  }

  public getFilter(): string {
    return this.filter;
  }

  public whenFavoritesChanged(listener: ((favs: string[]) => void)) {
    this.favoritesListeners.push(listener);
    listener(Array.from(this.favoriteIds.values()));
  }

  public whenFilterChanged(listener: ((filter: string) => void)) {
    this.filterListeners.push(listener);
    listener(this.filter);
  }
}
