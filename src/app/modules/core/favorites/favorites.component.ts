import { Component } from '@angular/core';

import { AlbumCardComponent } from '../../artist/album-card/album-card.component';
import { SongCardComponent } from '../../artist/song-card/song-card.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule, MatGridTile } from '@angular/material/grid-list';
import { FavoritesService } from '../../../services/user-preferences/favorites.service';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';

import { Song } from '../../../models/song';
import { Album } from '../../../models/album';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatGridTile,
    MatListModule,
    MatExpansionModule,
    AlbumCardComponent,
    SongCardComponent,
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.sass',
})
export class FavoritesComponent {
  public songs: Song[] = [];
  public albums: Album[] = [];
  public cols: string = '';

  constructor(private favoritesService: FavoritesService) {
    if (window.innerWidth <= 768) {
      this.cols = '1';
    } else {
      this.cols = '2';
    }
    this.albums = this.favoritesService
      .getAllAlbums()
      .map((album) => ({ ...album }));
    this.songs = this.favoritesService
      .getAllSongs()
      .map((song) => ({ ...song }));
  }

  ngOnInit() {
    this.favoritesService
      .subscribeToAlbums()
      .subscribe((newAlbums: Album[]) => {
        this.albums = newAlbums.map((album) => ({ ...album }));
      });
    this.favoritesService.subscribeToSongs().subscribe((newSongs: Song[]) => {
      this.songs = newSongs.map((song) => ({ ...song }));
    });
  }
}
