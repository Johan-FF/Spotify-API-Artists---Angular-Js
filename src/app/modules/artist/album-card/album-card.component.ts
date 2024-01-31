import { Component, Input } from '@angular/core';

import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { Album } from '../../../models/album';

@Component({
  selector: 'app-album-card',
  standalone: true,
  imports: [
    MatListModule,
    MatExpansionModule,
    MatCardModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './album-card.component.html',
  styleUrl: './album-card.component.sass',
})
export class AlbumCardComponent {
  @Input() public album!: Album;
}
