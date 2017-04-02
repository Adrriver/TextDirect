import { TestBed, inject } from '@angular/core/testing';
import { PriceReportService } from './price-report.service';

describe('PriceReportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PriceReportService]
    });
  });

  it('should ...', inject([PriceReportService], (service: PriceReportService) => {
    expect(service).toBeTruthy();
  }));
});
