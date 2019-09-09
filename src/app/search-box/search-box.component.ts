import { Component, Output, EventEmitter } from '@angular/core';
import { MovieSummary } from '../movie-service/movie.model';
import { MovieUpdatesService } from '../movie-service/movie-updates.service';
import { MovieService } from '../movie-service/movie-service.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent {
  public searchText: string = "";

  constructor(
    private movieService: MovieService,
    private updateService: MovieUpdatesService
  ) { }

  private lastChangeID: number;
  searchChanged() {
    clearTimeout(this.lastChangeID);
    this.lastChangeID = window.setTimeout(() => {
      this.updateMovieList(this.searchText);
    }, 1000);
  }

  updateMovieList(searchText: string) {
    this.movieService.searchForMovie(searchText)
      .subscribe(
        movies => {
          this.updateService.searchResults.next(movies);
        },
        error => {
          this.updateService.searchResults.next(null);
        }
      );
  }
}
