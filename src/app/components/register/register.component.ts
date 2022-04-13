import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder) {
    this.registerForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      repPassword: ['', Validators.required],
      profileType: ['Selecciona el tipo de perfil'],
    });
  }

  ngOnInit(): void {}

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  get repPassword(): boolean {
    if (
      this.registerForm.get('password')?.value !=
      this.registerForm.get('repPassword')?.value
    ) {
      return false;
    } else {
      return true;
    }
  }

  get validProfileType(): boolean {
    if (
      this.registerForm.get('profileType')?.value != 'user' &&
      this.registerForm.get('profileType')?.value != 'artist'
    ) {
      return false;
    } else {
      return true;
    }
  }

  register() {
    this.submitted = true;
    if (!this.registerForm.valid || !this.repPassword || !this.validProfileType)
      return;
    console.log('registrado');
  }
}
