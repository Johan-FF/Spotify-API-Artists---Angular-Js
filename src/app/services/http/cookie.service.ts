import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CookieStorageService {
  constructor(private cookieService: CookieService) {}

  setCookie(key: string, value: string, expirationDays: number = 1): void {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + expirationDays);

    this.cookieService.set(key, value, expirationDate, '/');
  }

  getCookie(key: string): string | null {
    return this.cookieService.get(key);
  }

  deleteCookie(key: string): void {
    this.cookieService.delete(key, '/');
  }
}
