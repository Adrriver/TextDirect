import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCompetitorComponent } from './item-competitor.component';

describe('ItemCompetitorComponent', () => {
  let component: ItemCompetitorComponent;
  let fixture: ComponentFixture<ItemCompetitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCompetitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCompetitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
