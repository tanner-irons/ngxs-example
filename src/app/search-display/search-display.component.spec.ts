import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDisplayComponent } from './search-display.component';

describe('SearchDisplayComponent', () => {
  let component: SearchDisplayComponent;
  let fixture: ComponentFixture<SearchDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
