import { Component } from '@angular/core';
import { MovieSummary } from '../movie-service/movie.model';
import { FavoritesService } from '../favorites-service/favorites.service';
import { Observable } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Select } from '@ngxs/store';
import { MovieSearchState } from '../movie-store/states/movie-search.state';

@AutoUnsubscribe()
@Component({
  selector: 'app-search-display',
  templateUrl: './search-display.component.html',
  styleUrls: ['./search-display.component.scss']
})
export class SearchDisplayComponent {
  public movieList: MovieSummary[] = [];
  public movieError: string;

  @Select(MovieSearchState.getMovieList) public movieList$: Observable<MovieSummary[]>;
  @Select(MovieSearchState.getMovieError) public movieError$: Observable<string>;

  constructor(
    private favoritesService: FavoritesService) {
  }

  onMovieFavorited(movie: MovieSummary) {
    this.favoritesService.newFavorite(movie.imdbID);
  }

  ngOnDestroy() {
    // This must be implemented when using Auto-Unsubscribe even if you don't actually do anything here.
  }
}
