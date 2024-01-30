import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieStorageService } from '../services/http/cookie.service';
import { NAME_USER_STATE } from '../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const url = req.url;

  if (
    url === 'https://accounts.spotify.com/authorize?' ||
    url === 'https://accounts.spotify.com/api/token' ||
    url === 'https://ipapi.co/json'
  ) {
    return next(req);
  }

  const cookieService = inject(CookieStorageService);
  const data = cookieService.getCookie(NAME_USER_STATE);
  const token = data ? JSON.parse(data) : '';
  req = req.clone({
    setHeaders: {
      Authorization: token.access_token
        ? `${token.token_type} ${token.access_token}`
        : '',
    },
  });
  return next(req);
};
