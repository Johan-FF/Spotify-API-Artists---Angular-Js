import { Component } from '@angular/core';

import { MenuComponent } from '../../core/menu/menu.component';
import { FavoritesComponent } from '../../core/favorites/favorites.component';
import { CardComponent } from '../card/card.component';
import { SearchComponent } from '../search/search.component';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule, MatGridTile } from '@angular/material/grid-list';

@Component({
  selector: 'app-artists-viewer',
  standalone: true,
  imports: [
    MenuComponent,
    FavoritesComponent,
    CardComponent,
    SearchComponent,
    MatPaginatorModule,
    MatCardModule,
    MatGridListModule,
    MatGridTile,
  ],
  templateUrl: './artists-viewer.component.html',
  styleUrl: './artists-viewer.component.sass',
})
export default class ArtistsViewerComponent {}
