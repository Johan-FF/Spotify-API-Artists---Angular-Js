import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { APP_CREDENTIALS } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private clientID = APP_CREDENTIALS.CLIENT_ID;
  private redirectUri = 'http://localhost:4200/user/login';

  constructor(private http: HttpClient) {}

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
    const CLIENT_SECRET = APP_CREDENTIALS.CLIENT_SECRET;

    const body = new HttpParams()
      .set('code', code)
      .set('redirect_uri', this.redirectUri)
      .set('grant_type', 'authorization_code');

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(`${this.clientID}:${CLIENT_SECRET}`),
    });

    return this.http.post(url, body.toString(), { headers });
  }

  public getUser() {
    const url = 'https://api.spotify.com/v1/me';
    return this.http.get(url);
  }
}
