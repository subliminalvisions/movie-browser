import { TestBed } from '@angular/core/testing';

import { CurrentSlideService } from './current-slide.service';

describe('CurrentSlideService', () => {
  let service: CurrentSlideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentSlideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
