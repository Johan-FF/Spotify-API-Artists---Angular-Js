import { Component } from '@angular/core';

import { MenuComponent } from '../../core/menu/menu.component';
import { FavoritesComponent } from '../../core/favorites/favorites.component';
import { CardComponent } from '../card/card.component';
import { SearchComponent } from '../search/search.component';

import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule, MatGridTile } from '@angular/material/grid-list';

import { ArtistsService } from '../../../services/spotify-api/artists.service';
import { Artist } from '../../../models/artist';

@Component({
  selector: 'app-artists-viewer',
  standalone: true,
  imports: [
    MenuComponent,
    FavoritesComponent,
    CardComponent,
    SearchComponent,
    MatPaginatorModule,
    MatCardModule,
    MatGridListModule,
    MatGridTile,
  ],
  templateUrl: './artists-viewer.component.html',
  styleUrl: './artists-viewer.component.sass',
})
export default class ArtistsViewerComponent {
  public userSearch: string = 'Lo más escuchado';
  public limitSearch: number = 15;
  public pageIndex: number = 0;
  public offsetSearch: number = 0;
  public lengthArtists: number = 15;
  public artists: Artist[] = [];

  constructor(private artistsService: ArtistsService) {}

  ngOnInit() {
    this.artistsService.setLimitSearch(this.limitSearch);
    this.executeHttpRequest(this.userSearch, this.offsetSearch);
  }

  public handlerChangeOnSearch(newSearch: string) {
    if (newSearch !== '') {
      this.userSearch = newSearch;
    } else {
      this.userSearch = 'Lo más escuchado';
    }
    this.offsetSearch = 0;
    this.pageIndex = 0;
    this.executeHttpRequest(newSearch, this.offsetSearch);
  }

  public handleChangeOnOffset(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.offsetSearch = this.limitSearch * this.pageIndex;
    this.executeHttpRequest(this.userSearch, this.offsetSearch);
  }

  private executeHttpRequest(search: string, offset: number) {
    this.artistsService
      .getArtistsOfSearch(search, offset)
      .subscribe((res: any) => {
        this.artists = [];
        this.lengthArtists = res.artists.total;
        res.artists.items.map((artist: any) => {
          this.artists.push({
            id: artist.id,
            urlOpenOnSpotify: artist.external_urls.spotify,
            followers: artist.followers.total,
            genres: artist.genres,
            image: artist.images[1]
              ? artist.images[1].url
              : '../../../../assets/logo_spotify.jpg',
            name: artist.name,
            popularity: artist.popularity,
          });
        });
      });
  }
}
