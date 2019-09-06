import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCardDisplayComponent } from './movie-card-display.component';

describe('MovieCardDisplayComponent', () => {
  let component: MovieCardDisplayComponent;
  let fixture: ComponentFixture<MovieCardDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieCardDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieCardDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
