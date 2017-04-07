import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCompetitorsComponent } from './item-competitors.component';

describe('ItemCompetitorsComponent', () => {
  let component: ItemCompetitorsComponent;
  let fixture: ComponentFixture<ItemCompetitorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCompetitorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCompetitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
