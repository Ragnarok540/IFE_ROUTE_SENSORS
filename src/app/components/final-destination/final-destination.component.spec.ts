import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalDestinationComponent } from './final-destination.component';

describe('FinalDestinationComponent', () => {
  let component: FinalDestinationComponent;
  let fixture: ComponentFixture<FinalDestinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalDestinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
