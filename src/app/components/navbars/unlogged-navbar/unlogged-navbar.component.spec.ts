import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnloggedNavbarComponent } from './unlogged-navbar.component';

describe('UnloggedNavbarComponent', () => {
  let component: UnloggedNavbarComponent;
  let fixture: ComponentFixture<UnloggedNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnloggedNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnloggedNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
