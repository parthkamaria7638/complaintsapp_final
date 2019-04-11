import { TestBed, inject } from '@angular/core/testing';

import { ComplaintsService } from './complaints.service';

describe('ComplaintsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComplaintsService]
    });
  });

  it('should be created', inject([ComplaintsService], (service: ComplaintsService) => {
    expect(service).toBeTruthy();
  }));
});
