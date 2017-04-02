import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceReportDetailComponent } from './price-report-detail.component';

describe('PriceReportDetailComponent', () => {
  let component: PriceReportDetailComponent;
  let fixture: ComponentFixture<PriceReportDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceReportDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
