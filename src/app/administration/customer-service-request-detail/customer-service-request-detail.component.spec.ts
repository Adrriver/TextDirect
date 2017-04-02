import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerServiceRequestDetailComponent } from './customer-service-request-detail.component';

describe('CustomerServiceRequestDetailComponent', () => {
  let component: CustomerServiceRequestDetailComponent;
  let fixture: ComponentFixture<CustomerServiceRequestDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerServiceRequestDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerServiceRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
