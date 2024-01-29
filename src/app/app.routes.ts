import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'artists',
    title: 'Artists',
    loadComponent: () =>
      import('./modules/artists/artists-viewer/artists-viewer.component'),
  },
  {
    path: 'artist/:id',
    title: 'Artist View',
    loadComponent: () =>
      import('./modules/artist/artist-info/artist-info.component'),
  },
  {
    path: 'albums/new',
    title: 'Add Album',
    loadComponent: () =>
      import('./modules/albums/add-album/add-album.component'),
  },
  {
    path: '',
    redirectTo: '/artists',
    pathMatch: 'full',
  },
  {
    path: '*',
    redirectTo: '/artists',
    pathMatch: 'full',
  },
];
