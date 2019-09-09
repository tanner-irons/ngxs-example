import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { FavoritesService } from '../favorites-service/favorites.service';

@Component({
  selector: 'app-filter-select',
  templateUrl: './filter-select.component.html',
  styleUrls: ['./filter-select.component.scss']
})
export class FilterSelectComponent implements OnInit {

  public selected = 'all';

  constructor(
    private favoritesService: FavoritesService
  ) { }

  ngOnInit() {
  }

  public selectionChange(selection: MatSelectChange) {
    this.favoritesService.genreFilter.next(selection.value);
  }

}
