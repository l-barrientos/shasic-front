import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logged-navbar',
  templateUrl: './logged-navbar.component.html',
  styleUrls: ['./logged-navbar.component.css'],
})
export class LoggedNavbarComponent implements OnInit {
  rol: string;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkUserNotLogged();
    this.rol = localStorage.getItem('rol')!;
  }
  checkUserNotLogged() {
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['/login']);
    }
  }
}
