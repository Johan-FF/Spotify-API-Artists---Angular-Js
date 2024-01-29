import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArtistsService {
  private url = 'https://api.spotify.com/v1/search?';
  private urlComplement = (search: string, limit: string, offset: string) =>
    `q=${search}&type=artist&limit=${limit}&offset=${offset}`;
}
