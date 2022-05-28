import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsCreatedComponent } from './events-created.component';

describe('EventsCreatedComponent', () => {
  let component: EventsCreatedComponent;
  let fixture: ComponentFixture<EventsCreatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsCreatedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
