import { Component } from '@angular/core';
import { MenuComponent } from '../../core/menu/menu.component';
import { FavoritesComponent } from '../../core/favorites/favorites.component';

import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { Album } from '../../../models/album';
import { FavoritesService } from '../../../services/user-preferences/favorites.service';

@Component({
  selector: 'app-add-album',
  standalone: true,
  imports: [
    MenuComponent,
    FavoritesComponent,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-album.component.html',
  styleUrl: './add-album.component.sass',
})
export default class AddAlbumComponent {
  nameFormGroup = this.formBuilder.group({
    name: ['', Validators.required],
  });
  yearFormGroup = this.formBuilder.group({
    year: ['', Validators.required],
  });
  urlFormGroup = this.formBuilder.group({
    url: ['', [Validators.required, this.urlValidator]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private favoritesService: FavoritesService
  ) {}

  public urlValidator(control: FormControl) {
    const urlPattern =
      /^(http(s)?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ;,./?%&=]*)?$/;
    const valid = urlPattern.test(control.value);
    return valid ? null : { invalidUrl: true };
  }

  public onSubmit() {
    const name: string = String(this.nameFormGroup.value.name);
    const year: string = String(this.yearFormGroup.value.year);
    const url: string = String(this.urlFormGroup.value.url);

    const newAlbum: Album = {
      id: name + year + url.substring(url.length / 2, url.length),
      artists: [],
      availableMarkets: [],
      urlOpenOnSpotify: '',
      image: url,
      name: name,
      releaseDate: year,
      totalSongs: 0,
    };

    this.favoritesService.addAlbum(newAlbum);
  }
}
