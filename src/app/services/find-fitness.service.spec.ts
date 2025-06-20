import { TestBed } from '@angular/core/testing';

import { FindFitnessService } from './find-fitness.service';

describe('FindFitnessService', () => {
  let service: FindFitnessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindFitnessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
