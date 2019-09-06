import { Component, OnInit } from '@angular/core';
import { MovieDetails } from '../movie-service/movie.model';

@Component({
  selector: 'app-favorite-display',
  templateUrl: './favorite-display.component.html',
  styleUrls: ['./favorite-display.component.scss']
})
export class FavoriteDisplayComponent implements OnInit {

  public favorites: MovieDetails[];

  constructor() { }

  ngOnInit() {
    this.favorites = JSON.parse(localStorage.getItem('favoriteMovies'));
  }

}
