import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextSearchHitsComponent } from './text-search-hits.component';

describe('TextSearchHitsComponent', () => {
  let component: TextSearchHitsComponent;
  let fixture: ComponentFixture<TextSearchHitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextSearchHitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextSearchHitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
