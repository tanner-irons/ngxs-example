import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { FavoritesService } from '../favorites-service/favorites.service';
import { Store } from '@ngxs/store';
import { SetGenreFilter } from '../favorite-store/actions/favorites.actions';

@Component({
  selector: 'app-filter-select',
  templateUrl: './filter-select.component.html',
  styleUrls: ['./filter-select.component.scss']
})
export class FilterSelectComponent implements OnInit {

  public selected = 'all';

  constructor(
    private store: Store
  ) { }

  ngOnInit() {
  }

  public selectionChange(selection: MatSelectChange) {
    this.store.dispatch(new SetGenreFilter(selection.value));
  }

}
