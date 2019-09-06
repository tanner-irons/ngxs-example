import { Component, OnInit } from '@angular/core';
import { MovieSummary } from '../movie-service/movie.model';
import { FavoritesService } from '../favoritesService/favorites.service';

@Component({
  selector: 'app-search-display',
  templateUrl: './search-display.component.html',
  styleUrls: ['./search-display.component.scss']
})
export class SearchDisplayComponent {
  public movieList: MovieSummary[] = [];
  public movieError: string;

  constructor(private favoritesService: FavoritesService) { }

  onMovieFavorited(movie: MovieSummary) {
    this.favoritesService.newFavorite(movie.imdbID);
  }

  updateMovieList(newList: MovieSummary[]) {
    this.movieError = null;
    this.movieList = newList;
  }

  updateError(newError: string) {
    this.movieError = newError;
  }
}
