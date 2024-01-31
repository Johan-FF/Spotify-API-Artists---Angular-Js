import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LoginService } from '../../../services/spotify-api/login.service';
import { CookieStorageService } from '../../../services/http/cookie.service';

import { NAME_USER_STATE } from '../../../../environments/environment';
import { UserStates } from '../../../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass',
})
export default class LoginComponent {
  private nameState = 'LOGIN_STATE';
  public state: UserStates = 'inactive';

  constructor(
    private route: ActivatedRoute,
    private loginService: LoginService,
    private cookieService: CookieStorageService,
    private router: Router
  ) {
    const prevState = window.localStorage.getItem(this.nameState);
    if (prevState === 'processing') {
      this.state = 'processing';
      this.loadSpotifySettings();
    }
  }

  private loadSpotifySettings() {
    this.route.queryParams.subscribe((params: Params) => {
      const code = params['code'];
      const state = params['state'];
      this.loginService
        .loadSpotifySettings(code, state)
        .subscribe((res: any) => {
          this.cookieService.setCookie(NAME_USER_STATE, JSON.stringify(res));

          this.state = 'active';
          window.localStorage.setItem(this.nameState, this.state);
          this.router.navigate(['/artists']);
        });
    });
  }

  public login() {
    this.state = 'processing';
    window.localStorage.setItem(this.nameState, this.state);
    this.loginService.login();
  }
}
