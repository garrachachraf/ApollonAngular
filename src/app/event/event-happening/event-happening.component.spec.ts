import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventHappeningComponent } from './event-happening.component';

describe('EventHappeningComponent', () => {
  let component: EventHappeningComponent;
  let fixture: ComponentFixture<EventHappeningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventHappeningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventHappeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
