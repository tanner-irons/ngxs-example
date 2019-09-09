import { Component, OnInit } from '@angular/core';
import { MovieSummary } from '../movie-service/movie.model';
import { FavoritesService } from '../favorites-service/favorites.service';
import { MovieUpdatesService } from '../movie-service/movie-updates.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-display',
  templateUrl: './search-display.component.html',
  styleUrls: ['./search-display.component.scss']
})
export class SearchDisplayComponent {
  public movieList: MovieSummary[] = [];
  public movieError: string;
  private updateSubscribtion: Subscription;

  constructor(
    private favoritesService: FavoritesService,
    private updateService: MovieUpdatesService) {
    this.updateSubscribtion = this.updateService.searchResults.subscribe(summaries => {
      if (summaries) {
        this.movieError = null;
        this.movieList = summaries;
      } else {
        this.movieError = "No Movies Found";
      }
    });
  }

  onMovieFavorited(movie: MovieSummary) {
    this.favoritesService.newFavorite(movie.imdbID);
  }
}
