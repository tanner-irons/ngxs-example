import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MovieDetails, MovieSummary } from '../movie-service/movie.model';
import { MovieServiceService } from '../movie-service/movie-service.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  public searchText: string = "";
  public movieList: MovieSummary[] = [];
  @Output() moviesChanged: EventEmitter<MovieSummary[]> = new EventEmitter();
  @Output() movieError: EventEmitter<string> = new EventEmitter();

  constructor(private movieService: MovieServiceService) { }

  ngOnInit() {
  }

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
        this.movieList = movies;
        this.moviesChanged.emit(this.movieList);
      })
      .catch(err => {
        this.movieList = [];
        this.movieError.emit(err.error ? err.error : "unknown error");
      });
  }
}
