import { TestBed } from '@angular/core/testing';

import { CHttpInterceptor } from './c-http.interceptor';

describe('CHttpInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CHttpInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CHttpInterceptor = TestBed.inject(CHttpInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
