import { TestBed } from '@angular/core/testing';

import { RedirectInterceptorService } from './redirect-interceptor.service';

describe('RedirectInterceptorService', () => {
  let service: RedirectInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedirectInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
