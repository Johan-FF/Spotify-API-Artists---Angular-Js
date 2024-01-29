import { Component } from '@angular/core';
import { MenuComponent } from '../../core/menu/menu.component';
import { FavoritesComponent } from '../../core/favorites/favorites.component';
import { CardComponent } from '../card/card.component';
import { CardListComponent } from '../card-list/card-list.component';

@Component({
  selector: 'app-artist-info',
  standalone: true,
  imports: [
    MenuComponent,
    FavoritesComponent,
    CardComponent,
    CardListComponent,
  ],
  templateUrl: './artist-info.component.html',
  styleUrl: './artist-info.component.sass',
})
export default class ArtistInfoComponent {}
