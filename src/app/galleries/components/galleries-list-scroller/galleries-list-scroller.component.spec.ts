import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleriesListScrollerComponent } from './galleries-list-scroller.component';

describe('GalleriesListScrollerComponent', () => {
  let component: GalleriesListScrollerComponent;
  let fixture: ComponentFixture<GalleriesListScrollerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleriesListScrollerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleriesListScrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
