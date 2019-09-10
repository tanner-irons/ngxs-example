import { Component } from '@angular/core';
import { MovieService } from '../movie-service/movie-service.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent {
  private lastChangeID: number;
  public searchText: string = "";

  constructor(private movieService: MovieService) { }

  searchChanged() {
    clearTimeout(this.lastChangeID);
    this.lastChangeID = window.setTimeout(() => {
      this.updateMovieList(this.searchText);
    }, 1000);
  }

  updateMovieList(searchText: string) {
    this.movieService.searchForMovie(searchText);
  }
}
