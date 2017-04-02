import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordRetrievalComponent } from './password-retrieval.component';

describe('PasswordRetrievalComponent', () => {
  let component: PasswordRetrievalComponent;
  let fixture: ComponentFixture<PasswordRetrievalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordRetrievalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordRetrievalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
