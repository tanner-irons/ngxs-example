import { Component, OnInit, Input } from '@angular/core';
import { MovieDetails } from '../movie-service/movie.model';

@Component({
  selector: 'app-filter-select',
  templateUrl: './filter-select.component.html',
  styleUrls: ['./filter-select.component.scss']
})
export class FilterSelectComponent implements OnInit {

  @Input() movies: MovieDetails[];
  constructor() { }

  ngOnInit() {
  }

}
