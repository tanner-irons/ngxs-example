import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Store } from '@ngxs/store';
import { SetSearchText } from '../movie-store/actions/movie-search.actions';
import { MovieSearchState } from '../movie-store/states/movie-search.state';

@AutoUnsubscribe()
@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  public searchText: string = "";
  private searchChangedSubject: Subject<string>;
  private searchChangeSubscription: Subscription;

  constructor(
    private store: Store) {
    this.searchChangedSubject = new Subject<string>();
    this.searchChangeSubscription = this.searchChangedSubject
      .pipe(
        debounceTime(1000)
      )
      .subscribe(searchText => {
        this.store.dispatch(new SetSearchText(searchText))
      });
  }

  ngOnInit() {
    this.searchText = this.store.selectSnapshot(MovieSearchState.getMovieSearch);
  }

  searchChanged(event: any) {
    this.searchChangedSubject.next(this.searchText);
  }

  ngOnDestroy() {
    // This must be implemented when using Auto-Unsubscribe even if you don't actually do anything here.
  }
}
