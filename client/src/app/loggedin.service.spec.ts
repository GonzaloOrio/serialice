import { TestBed, inject } from '@angular/core/testing';

import { LoggedinService } from './loggedin.service';

describe('LoggedinService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggedinService]
    });
  });

  it('should ...', inject([LoggedinService], (service: LoggedinService) => {
    expect(service).toBeTruthy();
  }));
});
