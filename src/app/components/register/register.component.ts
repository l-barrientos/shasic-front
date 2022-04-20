import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ArtistService } from '../../services/artist.service';
import { SharedService } from '../../services/shared.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private artistService: ArtistService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.registerForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      repPassword: ['', Validators.required],
      profileType: ['Selecciona el tipo de perfil'],
    });
  }

  ngOnInit(): void {
    document
      .getElementById('profileImage')
      ?.addEventListener('change', this.displayImage);
  }

  /* ***********SERVICES************* */

  /*
   *
   *
   * Execute the register services
   *
   *
   */
  register() {
    this.submitted = true;
    if (!this.registerForm.valid || !this.repPassword || !this.validProfileType)
      return;
    this.sharedService.runSpinner(true);
    const user = JSON.parse(
      JSON.stringify({
        email: this.registerForm.get('email')?.value,
        fullName: this.registerForm.get('fullName')?.value,
        userName: this.registerForm.get('userName')?.value.toLowerCase(),
        password: this.registerForm.get('password')?.value,
      })
    );

    if (this.registerForm.get('profileType')?.value == 'user') {
      this.registerUser(user);
    } else {
      this.registerArtist(user);
    }
  }

  /*
   *
   *
   * Execute the User register service
   *
   *
   */

  registerUser(user: any) {
    this.userService.register(user).subscribe({
      next: (response: any) => {
        console.log(response.rol);
        localStorage.setItem('access_token', response.access_token);
      },
      complete: () => {
        this.sharedService.runSpinner(false);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.log(error.error);
        this.sharedService.runSpinner(false);
      },
    });
  }

  /*
   *
   *
   * Execute the Artist register service
   *
   *
   */

  registerArtist(artist: any) {
    this.artistService.register(artist).subscribe({
      next: (response: any) => {
        console.log(response.rol);
        localStorage.setItem('access_token', response.access_token);
      },
      complete: () => {
        console.log('complete');
        this.sharedService.runSpinner(false);
      },
      error: (error) => {
        console.log(error.error);
        this.sharedService.runSpinner(false);
      },
    });
  }

  /* ***********VALIDATIONS************* */

  /*
   *
   *
   * Standard validation
   *
   *
   */
  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  /*
   *
   *
   * Check password and repeated password are equal
   *
   *
   */
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

  /*
   *
   *
   * Check valid profile type
   *
   *
   */
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

  /* ***********FUNCTIONS************* */

  /*
   *
   *
   * Display the image selected in file input
   *
   *
   */

  displayImage() {
    const e: any = document.getElementById('profileImage');
    if (e.files[0]) {
      var reader = new FileReader();
      reader.onload = (e: any) => {
        document
          .querySelector('.selectImage')
          ?.setAttribute('src', e.target?.result);
      };
      reader.readAsDataURL(e.files[0]);
    }
  }
}
