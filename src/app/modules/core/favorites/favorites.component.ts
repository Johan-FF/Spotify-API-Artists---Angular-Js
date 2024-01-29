import { Component } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule, MatGridTile } from '@angular/material/grid-list';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatCardModule,
    MatGridListModule,
    MatGridTile,
    MatButtonModule,
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.sass',
})
export class FavoritesComponent {
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
}
