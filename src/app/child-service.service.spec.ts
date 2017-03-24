import { TestBed, inject } from '@angular/core/testing';

import { ChildServiceService } from './child-service.service';

describe('ChildServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChildServiceService]
    });
  });

  it('should ...', inject([ChildServiceService], (service: ChildServiceService) => {
    expect(service).toBeTruthy();
  }));
});
