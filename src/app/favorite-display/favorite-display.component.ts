import { Component, OnInit } from '@angular/core';
import { MovieDetails } from '../movie-service/movie.model';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { FavoritesState } from '../favorite-store/states/favorites.state';

@Component({
  selector: 'app-favorite-display',
  templateUrl: './favorite-display.component.html',
  styleUrls: ['./favorite-display.component.scss']
})
export class FavoriteDisplayComponent implements OnInit {
  @Select(FavoritesState.getFilteredMovies) favoriteMovies$: Observable<MovieDetails[]>;
  public favorites: MovieDetails[];
  public loaded: boolean = false;

  ngOnInit(): void {
    this.favoriteMovies$.subscribe(favs => {
      this.favorites = favs;
      this.loaded = true;
    });
  }
}
