import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieSummary, MovieDetails } from './movie.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private static API_KEY: string = "3c11f8fd";
  private static API_BASE: string = `http://www.omdbapi.com/?apikey=${MovieService.API_KEY}`;

  constructor(private http: HttpClient) { }

  public searchForMovie(searchTerm: string): Observable<MovieSummary[]> {
    return this.http
      .get(MovieService.API_BASE + `&s=${searchTerm}`)
      .pipe(
        map(result => {
          let typedResponse = result as MovieSearchResult;
          if (typedResponse.Response === 'True') {
            return typedResponse.Search;
          } else {
            throw {
              error: typedResponse.Error
            };
          }
        })
      );
  }

  public getMovieByID(id: string): Observable<MovieDetails> {
    return this.http
      .get(MovieService.API_BASE + `&i=${id}`)
      .pipe(map(result => {
        return result as MovieDetails;
      }));
  }
}

interface MovieSearchResult {
  Search?: MovieSummary[],
  totalResults?: string,
  Response: 'False' | 'True',
  Error?: string
}
