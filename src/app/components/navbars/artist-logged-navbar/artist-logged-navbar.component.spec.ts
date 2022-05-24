import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistLoggedNavbarComponent } from './artist-logged-navbar.component';

describe('ArtistLoggedNavbarComponent', () => {
  let component: ArtistLoggedNavbarComponent;
  let fixture: ComponentFixture<ArtistLoggedNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistLoggedNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistLoggedNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
