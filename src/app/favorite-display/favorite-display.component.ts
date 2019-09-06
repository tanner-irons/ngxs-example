import { Component, OnInit, EventEmitter } from '@angular/core';
import { MovieDetails } from '../movie-service/movie.model';
import { FavoritesService } from '../favoritesService/favorites.service';
import { MovieServiceService } from '../movie-service/movie-service.service';

@Component({
    selector: 'app-favorite-display',
    templateUrl: './favorite-display.component.html',
    styleUrls: ['./favorite-display.component.scss']
})
export class FavoriteDisplayComponent implements OnInit {

    public favorites: MovieDetails[];
    public visibleFavorites: MovieDetails[];

    constructor(
        private favoriteService: FavoritesService,
        private movieService: MovieServiceService) { }
    ngOnInit() {
        this.favoriteService.whenFavoritesChanged(favs => this.newFavorites(favs));
    }

    filterChange(filterSelection: string) {
        this.visibleFavorites = this.favorites.filter(x => {
            let genres = x.Genre.split(',');
            for (let i = 0; i < genres.length; i++) {
                if (genres[i].toLowerCase().trim() === filterSelection) {
                    return true;
                }
            }
            return false;
        });
    }

    private newFavorites(favoriteList: string[]) {
        let requestList: Promise<MovieDetails>[] = [];
        for (let id of favoriteList) {
            requestList.push(
                this.movieService.getMovieByID(id)
            );
        }
        Promise.all(requestList)
            .then(list => {
                this.favorites = list;
                this.visibleFavorites = this.favorites;
            });
    }
}
