import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchDisplayComponent } from './search-display/search-display.component';
import { FavoriteDisplayComponent } from './favorite-display/favorite-display.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: SearchDisplayComponent },
  { path: 'favorites', component: FavoriteDisplayComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
