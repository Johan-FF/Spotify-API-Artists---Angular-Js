import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Artist } from '../../../models/artist';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatChipsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.sass',
})
export class CardComponent {
  @Input() public artist!: Artist;

  constructor(private router: Router) {}

  public redirectToEspecificArtist() {
    this.router.navigate([`/artist/${this.artist.id}`]);
  }
  public redirectToSpotify() {
    window.open(this.artist.urlOpenOnSpotify, '_blank');
  }
}
