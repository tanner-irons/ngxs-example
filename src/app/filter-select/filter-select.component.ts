import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-filter-select',
  templateUrl: './filter-select.component.html',
  styleUrls: ['./filter-select.component.scss']
})
export class FilterSelectComponent {

  @Output() filterChange: EventEmitter<string> = new EventEmitter<string>();

  public selected = 'all';

  constructor() { }

  public selectionChange(selection: MatSelectChange) {
    this.filterChange.emit(selection.value);
  }

}
