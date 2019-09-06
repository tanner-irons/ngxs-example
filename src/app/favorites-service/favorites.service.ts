import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private favoriteIds: Set<string> = new Set();

  private favoritesListeners: ((favs: string[]) => void)[];

  constructor() {
    this.favoritesListeners = [];
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

  public getFavorites(): Set<string> {
    return this.favoriteIds;
  }

  public whenFavoritesChanged(listener: ((favs: string[]) => void)) {
    this.favoritesListeners.push(listener);
    listener(Array.from(this.favoriteIds.values()));
  }
}
