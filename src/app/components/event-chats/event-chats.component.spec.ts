import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventChatsComponent } from './event-chats.component';

describe('EventChatsComponent', () => {
  let component: EventChatsComponent;
  let fixture: ComponentFixture<EventChatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventChatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventChatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
