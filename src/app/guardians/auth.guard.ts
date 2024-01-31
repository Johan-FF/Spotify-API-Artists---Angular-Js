import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieStorageService } from '../services/http/cookie.service';
import { NAME_USER_STATE } from '../../environments/environment';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieStorageService);

  const data = cookieService.getCookie(NAME_USER_STATE);
  if (data === null || data === undefined) {
    const router = inject(Router);
    router.navigate(['/user/login']);
    return false;
  }
  return true;
};
