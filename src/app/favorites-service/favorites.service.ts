import { Injectable } from '@angular/core';
import { MovieDetails } from '../movie-service/movie.model';
import { MovieService } from '../movie-service/movie-service.service';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private favoriteIds: Set<string>;
  public favoriteMovies: BehaviorSubject<MovieDetails[]> = new BehaviorSubject<MovieDetails[]>(null);
  public genreFilter: BehaviorSubject<string> = new BehaviorSubject<string>('all');

  constructor(
    private movieService: MovieService
  ) {
    // get favorites from local storage and emit
    this.favoriteIds = new Set(JSON.parse(localStorage.getItem('favoriteMovieIds')));
    this.getFavoriteMovies(Array.from(this.favoriteIds.values())).subscribe(favs => {
      this.favoriteMovies.next(favs);
    });
    // if there is a filter, filter and emit
    this.genreFilter.subscribe(filter => {
      this.getFavoriteMovies(Array.from(this.favoriteIds))
        .pipe(map(x => x.filter(y => {
          if (filter !== 'all') {
            return y.Genre.split(',').some(z => z.toLowerCase().trim() === filter)
          }
          return y;
        })))
        .subscribe(favs => {
          this.favoriteMovies.next(favs);
        });
    });
  }

  public newFavorite(id: string) {
    this.favoriteIds.add(id);
    let tmpArray = Array.from(this.favoriteIds.values());
    localStorage.setItem('favoriteMovieIds', JSON.stringify(tmpArray));
    this.getFavoriteMovies(tmpArray).subscribe(favs => {
      this.favoriteMovies.next(favs);
    });
  }

  private getFavoriteMovies(favoriteIds: string[]): Observable<MovieDetails[]> {
    let requestList: Observable<MovieDetails>[] = [];
    for (let id of favoriteIds) {
      requestList.push(
        this.movieService.getMovieByID(id)
      );
    }
    return forkJoin(requestList);
  }
}
