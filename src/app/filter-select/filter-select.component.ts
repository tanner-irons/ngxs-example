import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MovieDetails } from '../movie-service/movie.model';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-filter-select',
  templateUrl: './filter-select.component.html',
  styleUrls: ['./filter-select.component.scss']
})
export class FilterSelectComponent implements OnInit {

  @Output() filterChange: EventEmitter<string> = new EventEmitter<string>();

  public selected = 'all';

  constructor() { }

  ngOnInit() {
  }

  public selectionChange(selection: MatSelectChange) {
    this.filterChange.emit(selection.value);
  }

}
