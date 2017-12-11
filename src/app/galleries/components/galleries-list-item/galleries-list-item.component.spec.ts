import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleriesListItemComponent } from './galleries-list-item.component';

describe('GalleriesListItemComponent', () => {
  let component: GalleriesListItemComponent;
  let fixture: ComponentFixture<GalleriesListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleriesListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleriesListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
