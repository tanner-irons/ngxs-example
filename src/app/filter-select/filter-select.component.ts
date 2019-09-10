import { Component, SimpleChanges, ViewChild } from '@angular/core';
import { MatSelectChange, MatSelect } from '@angular/material/select';
import { FavoritesService } from '../favorites-service/favorites.service';

@Component({
  selector: 'app-filter-select',
  templateUrl: './filter-select.component.html',
  styleUrls: ['./filter-select.component.scss']
})
export class FilterSelectComponent {

  public selected = 'all';
  @ViewChild(MatSelect) input: MatSelect;

  constructor(
    private favoriteService: FavoritesService
  ) { }

  ngOnInit(): void {
    this.input.registerOnChange(filter => this.selectionChange(filter));
  }

  public selectionChange(selection: string) {
    this.favoriteService.setFilter(selection);
  }

}
