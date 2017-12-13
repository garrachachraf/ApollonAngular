import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateArtworkComponent } from './create-artwork.component';

describe('CreateArtworkComponent', () => {
  let component: CreateArtworkComponent;
  let fixture: ComponentFixture<CreateArtworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateArtworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateArtworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
