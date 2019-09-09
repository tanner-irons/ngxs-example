import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SearchDisplayComponent } from './search-display/search-display.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { FavoriteDisplayComponent } from './favorite-display/favorite-display.component';
import { FilterSelectComponent } from './filter-select/filter-select.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxsModule } from '@ngxs/store';
import { MovieSearchState } from './movie-store/states/movie-search.state';
import { NgxsStoragePluginModule, StorageOption } from '@ngxs/storage-plugin';
import { FavoritesState } from './favorite-store/states/favorites.state';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchDisplayComponent,
    SearchBoxComponent,
    FavoriteDisplayComponent,
    FilterSelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    NgxsModule.forRoot([
      MovieSearchState,
      FavoritesState
    ], {
      developmentMode: true //freeze the state of objects in the store
    }),
    NgxsStoragePluginModule.forRoot({
      key: ['favorites.movieIds'],
      storage: StorageOption.LocalStorage,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
