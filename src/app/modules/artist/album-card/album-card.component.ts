import { Component, Input, inject } from '@angular/core';

import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { Album } from '../../../models/album';
import { Router } from '@angular/router';
import { FavoritesService } from '../../../services/user-preferences/favorites.service';

@Component({
  selector: 'app-album-card',
  standalone: true,
  imports: [
    MatListModule,
    MatExpansionModule,
    MatCardModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './album-card.component.html',
  styleUrl: './album-card.component.sass',
})
export class AlbumCardComponent {
  @Input() public album!: Album;
  @Input() public isInFavorites!: boolean;

  constructor(
    private router: Router,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    if (!this.isInFavorites) {
      this.isInFavorites = this.favoritesService.isAlbumInList(this.album.id);
      this.favoritesService
        .subscribeToAlbums()
        .subscribe((newAlbums: Album[]) => {
          this.isInFavorites = this.favoritesService.isSongInList(
            this.album.id
          );
        });
    }
  }

  public redirectToArtist(artistID: string) {
    const url = `/artist/${artistID}`;

    this.router.navigateByUrl(url).then(() => {
      window.location.reload();
    });
  }

  public redirectToSpotify(urlOnSpotify: string) {
    window.open(urlOnSpotify, '_blank');
  }

  public handleFavorites() {
    if (this.isInFavorites) {
      this.favoritesService.deleteAlbum(this.album.id);
      this.isInFavorites = false;
    } else {
      this.favoritesService.addAlbum(this.album);
      this.isInFavorites = true;
    }
  }
}
