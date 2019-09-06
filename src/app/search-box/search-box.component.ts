import { Component, Output, EventEmitter } from '@angular/core';
import { MovieSummary } from '../movie-service/movie.model';
import { MovieServiceService } from '../movie-service/movie-service.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent {
  public searchText: string = "";
  @Output() moviesChanged: EventEmitter<MovieSummary[]> = new EventEmitter();
  @Output() movieError: EventEmitter<string> = new EventEmitter();

  constructor(private movieService: MovieServiceService) { }

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
        this.moviesChanged.emit(movies);
      })
      .catch(err => {
        this.movieError.emit(err.error ? err.error : "unknown error");
      });
  }
}
