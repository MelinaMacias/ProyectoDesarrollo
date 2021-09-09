import { TestBed } from '@angular/core/testing';

import { IsStaffGuard } from './is-staff.guard';

describe('IsStaffGuard', () => {
  let guard: IsStaffGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsStaffGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
