import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArtistsService {
  private searchUrl = 'https://api.spotify.com/v1/search?';
  private limit = 15;
  private urlComplement = (search: string, offset: number) =>
    `q=${search}&type=artist&limit=${this.limit}&offset=${offset.toString()}`;

  constructor(private http: HttpClient) {}

  public setLimitSearch(limit: number) {
    this.limit = limit;
  }

  public getArtistsOfSearch(search: string, offset: number) {
    return this.http.get(this.searchUrl + this.urlComplement(search, offset));
  }
}
