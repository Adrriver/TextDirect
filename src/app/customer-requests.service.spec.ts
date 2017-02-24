import { TestBed, inject } from '@angular/core/testing';
import { CustomerRequestsService } from './customer-requests.service';

describe('CustomerRequestsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerRequestsService]
    });
  });

  it('should ...', inject([CustomerRequestsService], (service: CustomerRequestsService) => {
    expect(service).toBeTruthy();
  }));
});
