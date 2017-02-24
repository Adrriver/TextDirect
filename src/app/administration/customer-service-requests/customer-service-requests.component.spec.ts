import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerServiceRequestsComponent } from './customer-service-requests.component';

describe('CustomerServiceRequestsComponent', () => {
  let component: CustomerServiceRequestsComponent;
  let fixture: ComponentFixture<CustomerServiceRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerServiceRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerServiceRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
