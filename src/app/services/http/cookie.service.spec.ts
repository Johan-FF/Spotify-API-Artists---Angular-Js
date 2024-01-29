import { TestBed } from '@angular/core/testing';

import { CookieStorageService } from './cookie.service';

describe('CookieService', () => {
  let service: CookieStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookieStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
