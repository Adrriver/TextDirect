import { TestBed, inject } from '@angular/core/testing';
import { CurrentActivityService } from './current-activity.service';

describe('CurrentActivityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentActivityService]
    });
  });

  it('should ...', inject([CurrentActivityService], (service: CurrentActivityService) => {
    expect(service).toBeTruthy();
  }));
});
