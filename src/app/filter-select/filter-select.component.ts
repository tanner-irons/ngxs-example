import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { FavoritesService } from '../favorites-service/favorites.service';

@Component({
  selector: 'app-filter-select',
  templateUrl: './filter-select.component.html',
  styleUrls: ['./filter-select.component.scss']
})
export class FilterSelectComponent implements OnInit {

  @Output() filterChange: EventEmitter<string> = new EventEmitter<string>();

  public selected = 'all';

  constructor(
    private favoritesService: FavoritesService
  ) { }

  ngOnInit() {
  }

  public selectionChange(selection: MatSelectChange) {
    this.favoritesService.setFilter(selection.value);
  }

}
