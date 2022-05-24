import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-logged-navbar',
  templateUrl: './user-logged-navbar.component.html',
  styleUrls: ['./user-logged-navbar.component.css'],
})
export class UserLoggedNavbarComponent implements OnInit {
  constructor(private router: Router, private actRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.checkUserNotLogged();
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
    if (input.value) {
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/search'], {
          relativeTo: this.actRoute,
          queryParams: { q: input.value },
        });
      });
    }
  }
}
