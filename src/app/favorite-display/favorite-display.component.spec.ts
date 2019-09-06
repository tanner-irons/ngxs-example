import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteDisplayComponent } from './favorite-display.component';

describe('FavoriteDisplayComponent', () => {
  let component: FavoriteDisplayComponent;
  let fixture: ComponentFixture<FavoriteDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
