import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
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
    this.userService
      .login(
        this.loginForm.get('email')?.value,
        this.loginForm.get('password')?.value
      )
      .subscribe({
        next: (response: any) => {
          localStorage.setItem('access_token', response.access_token);
        },
        complete: () => {
          console.log('complete');
        },

        error: (error) => {
          console.log(error.error);
        },
      });
  }
}
