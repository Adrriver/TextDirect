import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceReportsComponent } from './price-reports.component';

describe('PriceReportsComponent', () => {
  let component: PriceReportsComponent;
  let fixture: ComponentFixture<PriceReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
