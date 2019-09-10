import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieSummary, MovieDetails } from './movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private static API_KEY: string = "3c11f8fd";
  private static API_BASE: string = `http://www.omdbapi.com/?apikey=${MovieService.API_KEY}`;

  private movies: MovieSummary[] = [];
  private moviesListeners: ((movies: MovieSummary[]) => void)[] = [];

  private movieError: string;
  private movieErrorListeners: ((error: { error: string }) => void)[] = [];

  constructor(private http: HttpClient) { }

  public searchForMovie(searchTerm: string): void {
    this.http
      .get(MovieService.API_BASE + `&s=${searchTerm}`)
      .toPromise()
      .then(result => {
        let typedResponse = result as MovieSearchResult;
        if (typedResponse.Response === 'True') {
          for (let listener of this.moviesListeners) {
            listener(typedResponse.Search);
          }
          return typedResponse.Search;
        } else {
          for (let listener of this.movieErrorListeners) {
            listener({
              error: typedResponse.Error
            });
          }
        }
      });
  }

  public getMovieByID(id: string): Promise<MovieDetails> {
    return this.http
      .get(MovieService.API_BASE + `&i=${id}`)
      .toPromise()
      .then(result => {
        return result as MovieDetails;
      });
  }

  public whenMoviesChange(listener: ((movies: MovieSummary[]) => void)) {
    this.moviesListeners.push(listener);
    listener(this.movies);
  }

  public whenMoviesError(listener: ((error: { error: string }) => void)) {
    this.movieErrorListeners.push(listener);
    listener({ error: this.movieError });
  }
}

interface MovieSearchResult {
  Search?: MovieSummary[],
  totalResults?: string,
  Response: 'False' | 'True',
  Error?: string
}
