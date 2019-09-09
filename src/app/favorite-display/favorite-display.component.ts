import { Component, OnInit, EventEmitter } from '@angular/core';
import { MovieDetails } from '../movie-service/movie.model';
import { FavoritesService } from '../favorites-service/favorites.service';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';

@AutoUnsubscribe()
@Component({
    selector: 'app-favorite-display',
    templateUrl: './favorite-display.component.html',
    styleUrls: ['./favorite-display.component.scss']
})
export class FavoriteDisplayComponent implements OnInit {

  public favorites: MovieDetails[];
  public visibleFavorites: MovieDetails[];
  private favoriteMovieSubscription: Subscription;

  constructor(
    private favoriteService: FavoritesService
  ) { }

  ngOnInit() {
    // We set our subscription equal to a declared member so that @ngx-auto-unsubscribe knows to unsubscribe
    this.favoriteMovieSubscription = this.favoriteService.favoriteMovies.subscribe(favs => {
      if (favs) {
        this.favorites = favs;
        this.visibleFavorites = this.favorites;
      }
    });
  }

  filterChange(filterSelection: string) {
      if (filterSelection === 'all') {
          this.visibleFavorites = this.favorites;
          return;
      }
      this.visibleFavorites = this.favorites.filter(x => {
          let genres = x.Genre.split(',');
          for (let i = 0; i < genres.length; i++) {
              if (genres[i].toLowerCase().trim() === filterSelection) {
                  return true;
              }
          }
          return false;
      });
  }

  ngOnDestroy() {
    // This must be implemented when using Auto-Unsubscribe even if you don't actually do anything here.
  }
}
