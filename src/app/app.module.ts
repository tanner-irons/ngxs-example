import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SearchDisplayComponent } from './search-display/search-display.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { MovieCardDisplayComponent } from './movie-card-display/movie-card-display.component';
import { FavoriteDisplayComponent } from './favorite-display/favorite-display.component';
import { FilterSelectComponent } from './filter-select/filter-select.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchDisplayComponent,
    SearchBoxComponent,
    MovieCardDisplayComponent,
    FavoriteDisplayComponent,
    FilterSelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
