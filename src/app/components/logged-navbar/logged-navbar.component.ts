import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-logged-navbar',
  templateUrl: './logged-navbar.component.html',
  styleUrls: ['./logged-navbar.component.css'],
})
export class LoggedNavbarComponent implements OnInit {
  rol: string;
  constructor(private router: Router, private actRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.checkUserNotLogged();
    this.rol = localStorage.getItem('rol')!;
    if (this.actRoute.snapshot.queryParamMap.get('q')) {
      let input: any = document.getElementById('searchInput')!;
      if (input != null) {
        input.value = this.actRoute.snapshot.queryParamMap.get('q');
      }
    }
  }
  checkUserNotLogged() {
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['/login']);
    }
  }
  query() {
    event?.preventDefault();
    const input = document.getElementById('searchInput') as HTMLInputElement;
    this.router.navigate(['/search'], {
      relativeTo: this.actRoute,
      queryParams: { q: input.value },
    });
  }
}
