import { Component } from '@angular/core';
import { MenuComponent } from '../../core/menu/menu.component';
import { FavoritesComponent } from '../../core/favorites/favorites.component';
import { CardComponent } from '../card/card.component';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-artists-viewer',
  standalone: true,
  imports: [MenuComponent, FavoritesComponent, CardComponent, SearchComponent],
  templateUrl: './artists-viewer.component.html',
  styleUrl: './artists-viewer.component.sass',
})
export default class ArtistsViewerComponent {}
