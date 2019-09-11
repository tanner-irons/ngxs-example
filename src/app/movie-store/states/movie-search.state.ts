
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { MovieSummary } from '../../movie-service/movie.model';
import { SetSearchText } from '../actions/movie-search.actions';
import { MovieService } from '../../movie-service/movie-service.service';

export interface IMovieSearchStateModel {
  searchText: string;
  movieList: MovieSummary[];
  movieError: string;
}

@State<IMovieSearchStateModel>({
  name: 'movieSearch',
  defaults: {
    searchText: "",
    movieList: [],
    movieError: null
  }
})
export class MovieSearchState {

  constructor(
    private movieService: MovieService
  ) { }

  @Selector()
  static getMovieList(state: IMovieSearchStateModel): MovieSummary[] {
    return state.movieList;
  }
  @Selector()
  static getMovieError(state: IMovieSearchStateModel): string {
    return state.movieError;
  }
  @Selector()
  static getMovieSearch(state: IMovieSearchStateModel): string {
    return state.searchText;
  }

  @Action(SetSearchText)
  setSearchText(ctx: StateContext<IMovieSearchStateModel>, { payload }: SetSearchText) {
    ctx.patchState({
      searchText: payload
    });

    this.movieService.searchForMovie(payload)
      .subscribe(
        movies => {
          ctx.patchState({
            movieList: movies,
            movieError: null
          });
        },
        error => {
          ctx.patchState({
            movieList: [],
            movieError: error.error
          });
        }
      );
  }
}
