import { Component, Output, EventEmitter } from '@angular/core';
import { MovieSummary } from '../movie-service/movie.model';
import { MovieServiceService } from '../movie-service/movie-service.service';
import { MovieUpdatesService } from '../movie-service/movie-updates.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent {
  public searchText: string = "";

  constructor(
    private movieService: MovieServiceService,
    private updateService: MovieUpdatesService) { }

  private lastChangeID: number;
  searchChanged() {
    clearTimeout(this.lastChangeID);
    this.lastChangeID = window.setTimeout(() => {
      this.updateMovieList(this.searchText);
    }, 1000);
  }

  updateMovieList(searchText: string) {
    this.movieService.searchForMovie(searchText)
      .then(movies => {
        this.updateService.searchResults.next(movies);
      })
      .catch(err => {
        this.updateService.searchResults.next(null);
      });
  }
}
