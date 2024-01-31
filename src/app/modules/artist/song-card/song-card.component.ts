import { Component, Input } from '@angular/core';

import { AlbumCardComponent } from '../album-card/album-card.component';
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
    AlbumCardComponent,
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

  public msToMinutesAndSeconds(ms: number) {
    const second = Math.floor(ms / 1000);
    const minutes = Math.floor(second / 60);
  
    const secondsRemaining = second % 60;
  
    const minutesFormated = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const secondsFormated = secondsRemaining < 10 ? `0${secondsRemaining}` : `${secondsRemaining}`;
  
    return `${minutesFormated}:${secondsFormated}`;
  }
}
