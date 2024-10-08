import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { urlResolver } from './url.resolver';

describe('urlResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => urlResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
