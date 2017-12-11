import { TestBed, inject } from '@angular/core/testing';

import { MediaUploadService } from './media-upload.service';

describe('MediaUploadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MediaUploadService]
    });
  });

  it('should be created', inject([MediaUploadService], (service: MediaUploadService) => {
    expect(service).toBeTruthy();
  }));
});
