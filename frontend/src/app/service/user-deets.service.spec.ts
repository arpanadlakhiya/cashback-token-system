import { TestBed } from '@angular/core/testing';

import { UserDeetsService } from './user-deets.service';

describe('UserDeetsService', () => {
  let service: UserDeetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDeetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
