import { TestBed, inject } from '@angular/core/testing';

import { NewItemCreatorService } from './new-item-creator.service';

describe('NewItemCreatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewItemCreatorService]
    });
  });

  it('should ...', inject([NewItemCreatorService], (service: NewItemCreatorService) => {
    expect(service).toBeTruthy();
  }));
});
