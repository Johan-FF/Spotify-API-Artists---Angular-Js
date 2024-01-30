import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ArtistsService {
  private url = 'https://api.spotify.com/v1/';
  private countryCode: string = '';
  private limitSearch = 15;

  constructor(private http: HttpClient) {}

  public setLimitSearch(limit: number) {
    this.limitSearch = limit;
  }

  public getArtistsOfSearch(search: string, offset: number) {
    return this.http.get(
      this.url +
        `search?q=${search}&type=artist&limit=${
          this.limitSearch
        }&offset=${offset.toString()}`
    );
  }

  public getArtistByID(id: string) {
    return this.http.get(this.url + 'artists/' + id);
  }

  public getAlbumsOfArtistByID(id: string) {
    return this.http.get(
      this.url + 'artists/' + id + '/albums?limit=10&offset=0'
    );
  }

  public getSongsOfArtistByID(id: string) {
    if (this.countryCode === '')
      return this.http.get('https://ipapi.co/json').pipe(
        switchMap((res: any) => {
          this.countryCode = res.country_code;
          return this.http.get(
            this.url +
              'artists/' +
              id +
              '/top-tracks?market=' +
              res.country_code
          );
        })
      );
    return this.http.get(
      this.url + 'artists/' + id + '/top-tracks?market=' + this.countryCode
    );
  }
}
