import { TestBed, inject } from '@angular/core/testing';

import { EmailvalidationService } from './emailvalidation.service';

describe('EmailvalidationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmailvalidationService]
    });
  });

  it('should be created', inject([EmailvalidationService], (service: EmailvalidationService) => {
    expect(service).toBeTruthy();
  }));
});
