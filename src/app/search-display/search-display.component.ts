import { Component, OnInit } from '@angular/core';
import { MovieSummary } from '../movie-service/movie.model';

@Component({
  selector: 'app-search-display',
  templateUrl: './search-display.component.html',
  styleUrls: ['./search-display.component.scss']
})
export class SearchDisplayComponent implements OnInit {

  public movieList: MovieSummary[] = [];

  public movieError: string;

  constructor() { }

  ngOnInit() {
  }

  updateMovieList(newList: MovieSummary[]) {
    console.log(newList);
    this.movieError = null;
    this.movieList = newList;
  }

  updateError(newError: string) {
    console.log(newError);
    this.movieError = newError;
  }

}
