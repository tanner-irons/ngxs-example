import { Component, OnInit } from '@angular/core';
import { MovieSummary } from '../movie-service/movie.model';
import { FavoritesService } from '../favorites-service/favorites.service';
import { MovieService } from '../movie-service/movie-service.service';

@Component({
  selector: 'app-search-display',
  templateUrl: './search-display.component.html',
  styleUrls: ['./search-display.component.scss']
})
export class SearchDisplayComponent implements OnInit {
  public movieList: MovieSummary[] = [];
  public movieError: string;

  constructor(
    private favoritesService: FavoritesService,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.movieService.whenMoviesChange((newList: MovieSummary[]) => {
      this.movieError = null;
      this.movieList = newList;
    });

    this.movieService.whenMoviesError((newError: { error: string }) => {
      this.movieError = newError.error;
    });
  }

  onMovieFavorited(movie: MovieSummary) {
    this.favoritesService.newFavorite(movie.imdbID);
  }
}
