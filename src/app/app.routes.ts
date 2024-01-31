import { Routes } from '@angular/router';
import { authGuard } from './guardians/auth.guard';

export const routes: Routes = [
  {
    path: 'user/login',
    title: 'Login',
    loadComponent: () => import('./modules/user/login/login.component'),
  },
  {
    path: 'artists',
    title: 'Artists',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./modules/artists/artists-viewer/artists-viewer.component'),
  },
  {
    path: 'artist/:id',
    title: 'Artist View',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./modules/artist/artist-info/artist-info.component'),
  },
  {
    path: 'albums/new',
    title: 'Add Album',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./modules/albums/add-album/add-album.component'),
  },
  {
    path: '',
    redirectTo: '/user/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/user/login',
    pathMatch: 'full',
  },
];
