import { Component } from '@angular/core';
import { MovieDetails } from '../movie-service/movie.model';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { FavoritesState } from '../favorite-store/states/favorites.state';

@Component({
    selector: 'app-favorite-display',
    templateUrl: './favorite-display.component.html',
    styleUrls: ['./favorite-display.component.scss']
})
export class FavoriteDisplayComponent {
  @Select(FavoritesState.getFilteredMovies) favoriteMovies$: Observable<MovieDetails[]>;
}
