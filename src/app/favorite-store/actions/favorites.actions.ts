import { MovieDetails } from 'src/app/movie-service/movie.model';

export class FetchFavoriteMovies {
  static readonly type = '[Favorites] Fetch Favorite Movies';

  constructor() { }
}

export class AddFavoriteMovie {
  static readonly type = '[Favorites] Add Favorite Movie';

  constructor(public payload: string) { }
}


export class SetGenreFilter {
  static readonly type = '[Favorites] Set Genre Filter';

  constructor(public payload: string) { }
}
