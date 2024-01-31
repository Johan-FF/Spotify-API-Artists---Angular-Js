import { Component } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

import { Router } from '@angular/router';

import { LoginService } from '../../../services/spotify-api/login.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.sass',
})
export class MenuComponent {
  public name: string = '';
  public profileImg: string = '';
  public hideMenu: boolean = true;

  constructor(private router: Router, private loginService: LoginService) {
    this.loginService.getUser().subscribe((res: any) => {
      this.name = res.display_name;
      this.profileImg = res.images[0]
        ? res.images[0].url
        : '../../../../assets/logo_spotify.jpg';
    });
  }

  public redirectToArtists() {
    this.router.navigate(['/artists']);
  }

  public redirectToAlbums() {
    this.router.navigate(['/albums/new']);
  }

  public viewMenu() {
    this.hideMenu = !this.hideMenu;
  }
}
