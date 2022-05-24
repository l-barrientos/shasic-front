import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artist-logged-navbar',
  templateUrl: './artist-logged-navbar.component.html',
  styleUrls: ['./artist-logged-navbar.component.css'],
})
export class ArtistLoggedNavbarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkUserNotLogged();
  }
  checkUserNotLogged() {
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['/login']);
    }
  }
}
