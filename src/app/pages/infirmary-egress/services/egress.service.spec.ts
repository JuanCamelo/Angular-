import { TestBed } from '@angular/core/testing';

import { EgressService } from './egress.service';

describe('EgressService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EgressService = TestBed.get(EgressService);
    expect(service).toBeTruthy();
  });
});
