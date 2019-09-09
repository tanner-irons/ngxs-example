import { Component } from '@angular/core';
import { MovieService } from '../movie-service/movie-service.service';
import { MovieUpdatesService } from '../movie-service/movie-updates.service';
import { Subject, Subscription, of } from 'rxjs';
import { debounceTime, catchError } from 'rxjs/operators';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { MovieSummary } from '../movie-service/movie.model';

@AutoUnsubscribe()
@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent {
  public searchText: string = "";
  private searchChangedSubject: Subject<string>;
  private searchChangeSubscription: Subscription;

  constructor(
    private movieService: MovieService,
    private updateService: MovieUpdatesService
  ) {
    this.searchChangedSubject = new Subject<string>();
    this.searchChangeSubscription = this.searchChangedSubject
      .pipe(
        debounceTime(1000)
      )
      .subscribe(searchText => this.updateMovieList(searchText));
  }

  searchChanged(event: any) {
    this.searchChangedSubject.next(this.searchText);
  }

  updateMovieList(searchText: string) {
    this.movieService.searchForMovie(searchText)
      .pipe(
        catchError(err => of(null as (MovieSummary[])))
      )
      .subscribe(
        movies => {
          this.updateService.searchResults.next(movies);
        }
      );
  }

  ngOnDestroy() {
    // This must be implemented when using Auto-Unsubscribe even if you don't actually do anything here.
  }
}
