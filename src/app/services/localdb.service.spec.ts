import { TestBed } from '@angular/core/testing';

import { LocaldbService } from './localdb.service';

describe('LocaldbService', () => {
  let service: LocaldbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocaldbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
