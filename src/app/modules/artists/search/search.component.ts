import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.sass',
})
export class SearchComponent {
  public value = '';
  @Output() changeSearch: EventEmitter<string> = new EventEmitter<string>();

  public setSearch() {
    this.changeSearch.emit(this.value);
  }

  public clearSearch() {
    this.value = '';
    this.setSearch();
  }
}
