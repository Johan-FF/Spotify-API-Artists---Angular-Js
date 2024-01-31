import { Component } from '@angular/core';
import { MenuComponent } from '../../core/menu/menu.component';
import { FavoritesComponent } from '../../core/favorites/favorites.component';
import { CardListComponent } from '../card-list/card-list.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

import { ActivatedRoute } from '@angular/router';

import { ArtistsService } from '../../../services/spotify-api/artists.service';

import { Artist } from '../../../models/artist';

@Component({
  selector: 'app-artist-info',
  standalone: true,
  imports: [
    MenuComponent,
    FavoritesComponent,
    CardListComponent,
    MatGridListModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    FormsModule,
    MatRadioModule,
    MatProgressBarModule,
    MatChipsModule,
  ],
  templateUrl: './artist-info.component.html',
  styleUrl: './artist-info.component.sass',
})
export default class ArtistInfoComponent {
  public artist!: Artist;
  private id: string = '';

  constructor(
    private artistsService: ArtistsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.artistsService.getArtistByID(this.id).subscribe((res: any) => {
      this.artist = {
        id: res.id,
        urlOpenOnSpotify: res.external_urls.spotify,
        followers: res.followers.total,
        genres: res.genres,
        image: res.images[1]
          ? res.images[1].url
          : '../../../../assets/logo_spotify.jpg',
        name: res.name,
        popularity: res.popularity,
      };
    });
  }

  public getValueProgrssBar(followers: number) {
    const maxFollowersInPlatform = 114580775;
    const relativeValue = (followers / maxFollowersInPlatform) * 100;
    return Math.min(100, Math.max(0, relativeValue));
  }

  public redirectToSpotify() {
    window.open(this.artist.urlOpenOnSpotify, '_blank');
  }
}
