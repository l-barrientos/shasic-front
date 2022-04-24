import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SharedService } from '../../services/shared.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  invalidCredentials = false;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;
    if (!this.loginForm.valid) return;
    this.sharedService.runSpinner(true);
    let rol: String;
    this.userService
      .login(
        this.loginForm.get('email')?.value,
        this.loginForm.get('password')?.value
      )
      .subscribe({
        next: (response: any) => {
          rol = response.rol;
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('rol', response.rol);
        },
        complete: () => {
          this.sharedService.runSpinner(false);
          rol == 'user' ? this.router.navigate(['/home']) : '';
        },

        error: (error) => {
          if (error.error == 'invalidCredentials') {
            this.invalidCredentials = true;
          }
          this.sharedService.runSpinner(false);
        },
      });
  }
}
