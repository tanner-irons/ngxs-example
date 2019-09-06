import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieSummary, MovieDetails } from './movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {

  private static API_KEY: string = "3c11f8fd";
  private static API_BASE: string = `http://www.omdbapi.com/?apikey=${MovieServiceService.API_KEY}`;

  constructor(private http: HttpClient) { }

  public searchForMovie(searchTerm: string): Promise<MovieSummary[]> {
    return this.http
      .get(MovieServiceService.API_BASE + `&s=${searchTerm}`)
      .toPromise()
      .then(result => {
        let typedResponse = result as MovieSearchResult;
        if (typedResponse.response === 'True') {
          return typedResponse.search;
        } else {
          throw 'no movies found';
        }
      });
  }

  public getMovieByID(id: string): Promise<MovieDetails> {
    return this.http
      .get(MovieServiceService.API_BASE + `&i=${id}`)
      .toPromise()
      .then(result => {
        return result as MovieDetails;
      });
  }
}

interface MovieSearchResult {
  search?: MovieSummary[],
  totalResults?: string,
  response: 'False' | 'True',
  error?: string
}