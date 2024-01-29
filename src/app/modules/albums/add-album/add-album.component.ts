import { Component } from '@angular/core';
import { MenuComponent } from '../../core/menu/menu.component';
import { FavoritesComponent } from '../../core/favorites/favorites.component';

@Component({
  selector: 'app-add-album',
  standalone: true,
  imports: [MenuComponent, FavoritesComponent],
  templateUrl: './add-album.component.html',
  styleUrl: './add-album.component.sass',
})
export default class AddAlbumComponent {}
