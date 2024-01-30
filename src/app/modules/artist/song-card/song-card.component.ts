import { Component, Input } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { Song } from '../../../models/song';

@Component({
  selector: 'app-song-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    MatExpansionModule,
    MatDividerModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './song-card.component.html',
  styleUrl: './song-card.component.sass',
})
export class SongCardComponent {
  @Input() public song!: Song;
}
