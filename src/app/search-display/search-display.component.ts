import { Component } from '@angular/core';
import { MovieSummary } from '../movie-service/movie.model';
import { FavoritesService } from '../favorites-service/favorites.service';
import { Observable } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Select, Store } from '@ngxs/store';
import { MovieSearchState } from '../movie-store/states/movie-search.state';
import { AddFavoriteMovie } from '../favorite-store/actions/favorites.actions';

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
    private store: Store
  ) { }

  onMovieFavorited(movie: MovieSummary) {
    this.store.dispatch(new AddFavoriteMovie(movie.imdbID));
  }

  ngOnDestroy() {
    // This must be implemented when using Auto-Unsubscribe even if you don't actually do anything here.
  }
}
