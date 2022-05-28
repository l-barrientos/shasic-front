import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsPerformedComponent } from './events-performed.component';

describe('EventsPerformedComponent', () => {
  let component: EventsPerformedComponent;
  let fixture: ComponentFixture<EventsPerformedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsPerformedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsPerformedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
