import { TestBed } from '@angular/core/testing';

import { ViewRequirementService } from './view-requirement.service';

describe('ViewRequirementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewRequirementService = TestBed.get(ViewRequirementService);
    expect(service).toBeTruthy();
  });
});
