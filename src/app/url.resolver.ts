import { ResolveFn } from '@angular/router';

export const urlResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
