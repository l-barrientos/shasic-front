import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { SharedService } from '../../services/shared.service';
import { ImageService } from '../../services/image.service';
import { Router } from '@angular/router';
import { Artist } from 'src/app/models/Artist';
import { ShasicUtils } from '../../helpers/ShasicUtils';
import { ArtistService } from '../../services/artist.service';

@Component({
  selector: 'app-artist-profile',
  templateUrl: './artist-profile.component.html',
  styleUrls: ['./artist-profile.component.css'],
})
export class ArtistProfileComponent implements OnInit {
  artist: Artist = {
    id: 0,
    userName: '',
    email: '',
    fullName: '',
    bio: null,
    events: [],
    followers: null,
    following: null,
    location: null,
    profileImage: 'default',
    password: null,
  };
  passwordForm: FormGroup;
  updateInfoForm: FormGroup;
  submittedInfo = false;
  submittedPassword = false;
  userNameUsed = false;
  emailUsed = false;
  validFileExtension = false;
  imageSelected = false;
  wrongPassword = false;
  setArtistImg = ShasicUtils.setArtistImg;
  constructor(
    private formBuilder: FormBuilder,
    private artistService: ArtistService,
    private sharedService: SharedService,
    private imgService: ImageService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {
    this.updateInfoForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      userName: ['', Validators.required],
      bio: [''],
      location: [''],
    });

    this.passwordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.pattern]],
      repNewPassword: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getArtistProfileInfo();
    document
      .getElementById('profileImage')
      ?.addEventListener('change', this.displayImage);
  }

  getArtistProfileInfo() {
    this.sharedService.runSpinner(true);
    this.artistService.getArtistProfile().subscribe({
      next: (response) => {
        this.artist = response;
        this.refreshForm(response);
      },
      complete: () => {
        this.sharedService.runSpinner(false);
      },
      error: (error) => {
        console.log(error);
        this.sharedService.showError(6000);
      },
    });
  }

  updateInfo() {
    this.emailUsed = false;
    this.userNameUsed = false;
    this.submittedInfo = true;
    if (!this.updateInfoForm.valid) return;
    this.sharedService.runSpinner(true);

    const artistInfo: Artist = {
      userName: this.updateInfoForm.value.userName,
      fullName: this.updateInfoForm.value.fullName,
      email: this.updateInfoForm.value.email,
      bio: this.updateInfoForm.value.bio,
      location: this.updateInfoForm.value.location,
      events: null,
      followers: null,
      following: null,
      id: 0,
      password: null,
      profileImage: '',
    };
    this.artistService.updateProfile(artistInfo).subscribe({
      complete: () => {
        const input = document.getElementById(
          'profileImage'
        ) as HTMLInputElement;
        if (input?.files?.length != 0) {
          this.pushImg(input.files?.item(0));
        } else {
          this.getArtistProfileInfo();
          this.updatedSuccess();
          this.sharedService.runSpinner(false);
        }
        this.submittedInfo = false;
      },
      error: (error) => {
        console.log(error);
        if (error.error == 'emailUsed') {
          this.emailUsed = true;
        } else if (error.error == 'userNameUsed') {
          this.userNameUsed = true;
        } else {
          this.sharedService.showError(6000);
        }
        this.sharedService.runSpinner(false);
      },
    });
  }

  updatePassword() {
    this.wrongPassword = false;
    this.submittedPassword = true;
    if (!this.passwordForm.valid || !this.repPassword || this.samePassword)
      return;
    this.sharedService.runSpinner(true);

    this.artistService
      .updatePassword(
        this.passwordForm.value.oldPassword,
        this.passwordForm.value.newPassword
      )
      .subscribe({
        complete: async () => {
          this.sharedService.runSpinner(false);
          this.submittedPassword = false;

          const passwordUpdated = document.getElementById(
            'passwordUpdated'
          )! as HTMLInputElement;
          passwordUpdated.style.display = 'block';
          await ShasicUtils.delay(3000);
          passwordUpdated.style.display = 'none';
        },
        error: (error) => {
          this.sharedService.runSpinner(false);
          if ((error.error = 'wrongPassword')) {
            this.wrongPassword = true;
          } else {
            this.sharedService.showError(3000);
            console.log(error);
          }
        },
      });
  }

  pushImg(img: any) {
    this.sharedService.runSpinner(true);
    this.imgService.uploadImage('artist', img).subscribe({
      complete: () => {
        this.getArtistProfileInfo();
        this.sharedService.runSpinner(false);
        this.updatedSuccess();
      },
      error: (error) => {
        this.getArtistProfileInfo();
        console.log(error);
        this.sharedService.showError(6000);
        this.sharedService.runSpinner(false);
      },
    });
  }
  /* VALIDATIONS */

  get f(): { [key: string]: AbstractControl } {
    return this.updateInfoForm.controls;
  }

  get fp(): { [key: string]: AbstractControl } {
    return this.passwordForm.controls;
  }

  /**
   * Check password and repeated password are equal
   */
  get repPassword(): boolean {
    return (
      this.passwordForm.get('newPassword')?.value ==
      this.passwordForm.get('repNewPassword')?.value
    );
  }

  /**
   * Check password is not the same as the previous password
   */
  get samePassword(): boolean {
    return (
      this.passwordForm.value.newPassword == this.passwordForm.value.oldPassword
    );
  }

  /* FUNCTIONS */

  signOut() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  refreshForm(artist: Artist) {
    this.updateInfoForm.setValue({
      email: artist.email,
      fullName: artist.fullName,
      userName: artist.userName,
      bio: artist.bio,
      location: artist.location,
    });
    document
      .querySelector('.selectImage')
      ?.setAttribute('src', this.setArtistImg(artist.profileImage));
  }

  async updatedSuccess() {
    const profileUpdated = document.getElementById(
      'profileUpdated'
    )! as HTMLInputElement;
    profileUpdated.style.display = 'block';
    await ShasicUtils.delay(3000);
    profileUpdated.style.display = 'none';
  }

  displayImage() {
    this.imageSelected = true;
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
