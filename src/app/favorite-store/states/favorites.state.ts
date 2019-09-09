import { State, Selector, Action, StateContext, NgxsOnInit } from '@ngxs/store';
import { MovieDetails } from 'src/app/movie-service/movie.model';
import { AddFavoriteMovie, SetGenreFilter, FetchFavoriteMovies } from '../actions/favorites.actions';
import { forkJoin, Observable } from 'rxjs';
import { MovieService } from 'src/app/movie-service/movie-service.service';
import { tap } from 'rxjs/operators';

export interface IFavoritesStateModel {
  movieIds: string[];
  movies: MovieDetails[];
  genreFilter: string;
}

@State<IFavoritesStateModel>({
  name: 'favorites',
  defaults: {
    movieIds: [],
    movies: null,
    genreFilter: 'all'
  }
})

export class FavoritesState implements NgxsOnInit {
  constructor(
    private movieService: MovieService
  ) { }

  public ngxsOnInit(ctx: StateContext<FavoritesState>): void {
    // Get movie details for existing favorites in localStorage
    ctx.dispatch(new FetchFavoriteMovies());
  }

  @Selector()
  static getFavoriteMovies(state: IFavoritesStateModel): MovieDetails[] {
    return state.movies;
  }

  @Selector()
  static getFilteredMovies(state: IFavoritesStateModel): MovieDetails[] {
    return state.movies.filter(x => {
      if (state.genreFilter !== 'all') {
        return x.Genre.split(',').some(y => y.toLowerCase().trim() === state.genreFilter)
      }
      return x;
    });
  }

  @Selector()
  static getGenreFilter(state: IFavoritesStateModel): string {
    return state.genreFilter;
  }

  @Action(AddFavoriteMovie)
  addFavoriteMovie(ctx: StateContext<IFavoritesStateModel>, { payload }: AddFavoriteMovie) {
    let favorites = new Set(ctx.getState().movieIds);
    favorites.add(payload);
    ctx.patchState({
      movieIds: Array.from(favorites)
    });
    ctx.dispatch(new FetchFavoriteMovies());
  }

  @Action(FetchFavoriteMovies)
  fetchFavoriteMovies(ctx: StateContext<IFavoritesStateModel>) {
    let movieIds = ctx.getState().movieIds;
    return this.fetchMovieDetails(Array.from(movieIds)).pipe(tap(x => {
      ctx.patchState({
        movies: x
      });
    }));
  }

  @Action(SetGenreFilter)
  SetSelectedSchedule(ctx: StateContext<IFavoritesStateModel>, { payload }: SetGenreFilter) {
    ctx.patchState({
      genreFilter: payload
    });
  }

  private fetchMovieDetails(movieIds: string[]): Observable<MovieDetails[]> {
    let requestList: Observable<MovieDetails>[] = [];
    for (let id of movieIds) {
      requestList.push(
        this.movieService.getMovieByID(id)
      );
    }
    return forkJoin(requestList);
  }
}
