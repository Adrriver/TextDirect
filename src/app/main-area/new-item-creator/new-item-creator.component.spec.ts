import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewItemCreatorComponent } from './new-item-creator.component';

describe('NewItemCreatorComponent', () => {
  let component: NewItemCreatorComponent;
  let fixture: ComponentFixture<NewItemCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewItemCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewItemCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
