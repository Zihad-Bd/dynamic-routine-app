import { TestBed } from '@angular/core/testing';

import { ManualDataProviderService } from './manual-data-provider.service';

describe('ManualDataProviderService', () => {
  let service: ManualDataProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManualDataProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
