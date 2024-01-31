import { Component, Input } from '@angular/core';

import { AlbumCardComponent } from '../album-card/album-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { Song } from '../../../models/song';
import { Router } from '@angular/router';
import { FavoritesService } from '../../../services/user-preferences/favorites.service';

@Component({
  selector: 'app-song-card',
  standalone: true,
  imports: [
    AlbumCardComponent,
    MatCardModule,
    MatListModule,
    MatExpansionModule,
    MatDividerModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './song-card.component.html',
  styleUrl: './song-card.component.sass',
})
export class SongCardComponent {
  @Input() public song!: Song;
  @Input() public isInFavorites!: boolean;
  public imageSize: number = 0;

  constructor(
    private router: Router,
    private favoritesService: FavoritesService
  ) {
    if (window.innerWidth <= 768) {
      this.imageSize = 150;
    } else {
      this.imageSize = 250;
    }
  }

  ngOnInit() {
    if (!this.isInFavorites) {
      this.isInFavorites = this.favoritesService.isSongInList(this.song.id);
      this.favoritesService.subscribeToSongs().subscribe((newSongs: Song[]) => {
        this.isInFavorites = this.favoritesService.isSongInList(this.song.id);
      });
    }
  }

  public msToMinutesAndSeconds(ms: number) {
    const second = Math.floor(ms / 1000);
    const minutes = Math.floor(second / 60);

    const secondsRemaining = second % 60;

    const minutesFormated = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const secondsFormated =
      secondsRemaining < 10 ? `0${secondsRemaining}` : `${secondsRemaining}`;

    return `${minutesFormated}:${secondsFormated}`;
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
      this.favoritesService.deleteSong(this.song.id);
      this.isInFavorites = false;
    } else {
      this.favoritesService.addSong(this.song);
      this.isInFavorites = true;
    }
  }
}
