import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  APP_CREDENTIALS,
  NAME_USER_STATE,
} from '../../../environments/environment';
import { CookieStorageService } from '../http/cookie.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private clientID = APP_CREDENTIALS.CLIENT_ID;
  private clientSecret = APP_CREDENTIALS.CLIENT_SECRET;
  private redirectUri = 'http://localhost:4200/user/login';

  constructor(
    private http: HttpClient,
    private cookieService: CookieStorageService,
    private router: Router
  ) {}

  public login() {
    const url = 'https://accounts.spotify.com/authorize?';
    const state = APP_CREDENTIALS.CLIENT_STATE;
    const scope = 'user-read-private user-read-email';

    const complement =
      `client_id=${this.clientID}&response_type=code` +
      `&redirect_uri=${this.redirectUri}&scope=${scope}&state=${state}`;

    window.location.href = url + complement;
  }

  public loadSpotifySettings(code: string, state: string) {
    const url = 'https://accounts.spotify.com/api/token';

    const body = new HttpParams()
      .set('code', code)
      .set('redirect_uri', this.redirectUri)
      .set('grant_type', 'authorization_code');

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(`${this.clientID}:${this.clientSecret}`),
    });

    return this.http.post(url, body.toString(), { headers });
  }

  public refreshSpotifyToken() {
    const url = 'https://accounts.spotify.com/api/token';
    const data = this.cookieService.getCookie(NAME_USER_STATE);
    const token = data ? JSON.parse(data) : '';

    const body = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set('refresh_token', token.refresh_token)
      .set('client_id', this.clientID);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(`${this.clientID}:${this.clientSecret}`),
    });

    return this.http.post(url, body.toString(), { headers });
  }

  public logout() {
    this.cookieService.deleteCookie(NAME_USER_STATE);
    this.router.navigate(['/user/login']);
  }

  public getUser() {
    const url = 'https://api.spotify.com/v1/me';
    return this.http.get(url);
  }
}
