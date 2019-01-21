import { TestBed } from '@angular/core/testing';

import { NewRequirementService } from './new-requirement.service';

describe('NewRequirementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewRequirementService = TestBed.get(NewRequirementService);
    expect(service).toBeTruthy();
  });
});
