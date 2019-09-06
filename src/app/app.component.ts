import { Component, OnInit } from '@angular/core';
import favorites from './favorite-display/favorites.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngxs-example';

  ngOnInit(): void {
    localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
  }
}
