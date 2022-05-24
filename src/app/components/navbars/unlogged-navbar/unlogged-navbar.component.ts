import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unlogged-navbar',
  templateUrl: './unlogged-navbar.component.html',
  styleUrls: ['./unlogged-navbar.component.css'],
})
export class UnloggedNavbarComponent implements OnInit {
  constructor(
    private sharedService: SharedService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.checkUserLogged();
  }

  checkUserLogged() {
    if (localStorage.getItem('access_token')) {
      this.sharedService.runSpinner(true);
      this.sharedService.autoLogin().subscribe({
        next: (response) => {
          if (response.rol == 'user') this.router.navigate(['/home']);
          if (response.rol == 'artist') this.router.navigate(['/artist-home']);
        },
        complete: () => {
          this.sharedService.runSpinner(false);
        },
        error: (error) => {
          console.clear();
          this.sharedService.runSpinner(false);
        },
      });
    }
  }
  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
}
