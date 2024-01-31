import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { AlbumCardComponent } from '../album-card/album-card.component';
import { SongCardComponent } from '../song-card/song-card.component';
import { MatExpansionModule } from '@angular/material/expansion';

import { ArtistsService } from '../../../services/spotify-api/artists.service';

import { Album } from '../../../models/album';
import { Song } from '../../../models/song';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    SongCardComponent,
    MatExpansionModule,
    AlbumCardComponent,
  ],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.sass',
})
export class CardListComponent {
  @Input() public type: 'albums' | 'songs' | 'undefined' = 'undefined';
  public albums: Album[] = [];
  public songs: Song[] = [];
  private id: string = '';

  constructor(
    private artistsService: ArtistsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    if (this.type === 'albums') {
      this.artistsService
        .getAlbumsOfArtistByID(this.id)
        .subscribe((res: any) => {
          res.items.map((album: any) => {
            this.albums.push({
              id: album.id,
              artists: album.artists.map((artist: any) => ({
                id: artist.id,
                urlOpenOnSpotify: artist.external_urls.spotify,
                followers: 0,
                genres: [],
                image: '../../../../assets/logo_spotify.jpg',
                name: artist.name,
                popularity: 0,
              })),
              availableMarkets: album.available_markets,
              urlOpenOnSpotify: album.external_urls.spotify,
              image: album.images[1]
                ? album.images[1].url
                : '../../../../assets/logo_album.jpg',
              name: album.name,
              releaseDate: album.release_date,
              totalSongs: album.total_tracks,
            });
          });
        });
    } else if (this.type === 'songs') {
      this.artistsService
        .getSongsOfArtistByID(this.id)
        .subscribe((res: any) => {
          console.log(res);
          res.tracks.map((song: any) => {
            this.songs.push({
              id: song.id,
              album: {
                id: song.album.id,
                artists: song.album.artists.map((artist: any) => ({
                  id: artist.id,
                  urlOpenOnSpotify: artist.external_urls.spotify,
                  followers: 0,
                  genres: [],
                  image: '../../../../assets/logo_spotify.jpg',
                  name: artist.name,
                  popularity: 0,
                })),
                availableMarkets: song.album.available_markets,
                urlOpenOnSpotify: song.album.external_urls.spotify,
                image: song.album.images[1]
                  ? song.album.images[1].url
                  : '../../../../assets/logo_album.jpg',
                name: song.album.name,
                releaseDate: song.album.release_date,
                totalSongs: song.album.total_tracks,
              },
              artists: song.artists.map((artist: any) => ({
                id: artist.id,
                urlOpenOnSpotify: artist.external_urls.spotify,
                followers: 0,
                genres: [],
                image: '../../../../assets/logo_spotify.jpg',
                name: artist.name,
                popularity: 0,
              })),
              albumNumber: song.disc_number,
              songNumber: song.track_number,
              duration: song.duration_ms,
              urlOpenOnSpotify: song.external_urls.spotify,
              name: song.name,
              popularity: song.popularity,
            });
          });
        });
    }
  }
}
