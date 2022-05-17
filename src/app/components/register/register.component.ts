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
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  userNameUsed = false;
  emailUsed = false;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private artistService: ArtistService,
    private sharedService: SharedService,
    private imgService: ImageService,
    private router: Router
  ) {
    this.registerForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern]],
      repPassword: ['', Validators.required],
      profileType: ['Selecciona el tipo de perfil'],
    });
  }

  ngOnInit(): void {
    document
      .getElementById('profileImage')
      ?.addEventListener('change', this.displayImage);
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

  /*
   *
   *
   * Check valid file extension on image input
   *
   *
   */
  get validFileExtension(): boolean {
    const regex = /(?:jpeg|jpg|png)/i;
    const input: any = document.getElementById('profileImage');
    if (input.files[0] && !regex.test(input.files[0].name)) {
      return false;
    }
    return true;
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
    this.emailUsed = false;
    this.userNameUsed = false;
    this.submitted = true;
    if (
      !this.registerForm.valid ||
      !this.repPassword ||
      !this.validProfileType ||
      !this.validFileExtension
    ) {
      return;
    }
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
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('rol', 'user');
      },
      complete: () => {
        const input = document.getElementById(
          'profileImage'
        ) as HTMLInputElement;
        if (input?.files?.length != 0) {
          this.sharedService.runSpinner(true);
          this.pushImg('user', input.files?.item(0));
        } else {
          this.router.navigate(['/home']);
          this.sharedService.runSpinner(false);
        }
      },
      error: (error) => {
        if (error.error == 'emailUsed') {
          this.emailUsed = true;
        }
        if (error.error == 'userNameUsed') {
          this.userNameUsed = true;
        }
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
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('rol', 'artist');
      },
      complete: () => {
        const input = document.getElementById(
          'profileImage'
        ) as HTMLInputElement;
        if (input?.files?.length != 0) {
          this.sharedService.runSpinner(true);
          this.pushImg('artist', input.files?.item(0));
        } else {
          this.router.navigate(['/artist-home']);
          this.sharedService.runSpinner(false);
        }
      },
      error: (error) => {
        if (error.error == 'emailUsed') {
          this.emailUsed = true;
        }
        if (error.error == 'userNameUsed') {
          this.userNameUsed = true;
        }
        this.sharedService.runSpinner(false);
      },
    });
  }

  /*
   *
   *
   * Execute the Image service to send it
   *
   *
   */

  pushImg(rol: string, img: any) {
    this.sharedService.runSpinner(true);
    this.imgService.uploadImage(rol, img).subscribe({
      next: (response) => {
        console.log(response);
      },
      complete: () => {
        if (rol == 'user') this.router.navigate(['/home']);
        if (rol == 'artist') this.router.navigate(['/artist-home']);
        this.sharedService.runSpinner(false);
      },
      error: (error) => {
        console.log(error);
        this.sharedService.runSpinner(false);
      },
    });
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
