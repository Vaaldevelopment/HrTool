import { TestBed } from '@angular/core/testing';

import { CandidateLookupService } from './candidate-lookup.service';

describe('CandidateLookupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CandidateLookupService = TestBed.get(CandidateLookupService);
    expect(service).toBeTruthy();
  });
});
