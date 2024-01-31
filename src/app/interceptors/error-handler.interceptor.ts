import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LoginService } from '../services/spotify-api/login.service';
import { CookieStorageService } from '../services/http/cookie.service';
import { NAME_USER_STATE } from '../../environments/environment';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((errorData) => {
      const loginService = inject(LoginService);
      const cookieService = inject(CookieStorageService);
      return loginService.refreshSpotifyToken().pipe(
        switchMap(() => {
          const data = cookieService.getCookie(NAME_USER_STATE);
          const token = data ? JSON.parse(data) : '';

          const newReq = req.clone({
            setHeaders: {
              Authorization: token.access_token
                ? `${token.token_type} ${token.access_token}`
                : '',
            },
          });

          return next(newReq);
        })
      );

      return throwError(() => errorData);
    })
  );
};
