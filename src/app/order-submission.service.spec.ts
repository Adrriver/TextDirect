import { TestBed, inject } from '@angular/core/testing';
import { OrderSubmissionService } from './order-submission.service';

describe('OrderSubmissionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderSubmissionService]
    });
  });

  it('should ...', inject([OrderSubmissionService], (service: OrderSubmissionService) => {
    expect(service).toBeTruthy();
  }));
});
