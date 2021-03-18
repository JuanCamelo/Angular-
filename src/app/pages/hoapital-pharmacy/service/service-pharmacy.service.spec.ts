import { TestBed } from '@angular/core/testing';

import { ServicePharmacyService } from './service-pharmacy.service';

describe('ServicePharmacyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicePharmacyService = TestBed.get(ServicePharmacyService);
    expect(service).toBeTruthy();
  });
});
