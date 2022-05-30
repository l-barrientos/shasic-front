import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/models/User';
import { SharedService } from '../../services/shared.service';
import { UserService } from '../../services/user.service';
import { ImageService } from '../../services/image.service';
import { Router } from '@angular/router';
import { ShasicUtils } from '../../helpers/ShasicUtils';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: User = {
    id: 0,
    userName: '',
    email: '',
    fullName: '',
    description: '',
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
  setUserImg = ShasicUtils.setUserImg;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private sharedService: SharedService,
    private imgService: ImageService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {
    this.updateInfoForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      userName: ['', Validators.required],
      description: [''],
    });

    this.passwordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      repNewPassword: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getUserProfileInfo();
    document
      .getElementById('profileImage')
      ?.addEventListener('change', this.displayImage);
  }

  getUserProfileInfo() {
    this.sharedService.runSpinner(true);
    this.userService.getUserProfile().subscribe({
      next: (response) => {
        this.user = response;
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

  refreshForm(user: User) {
    this.updateInfoForm.setValue({
      email: user.email,
      fullName: user.fullName,
      userName: user.userName,
      description: user.description,
    });
    document
      .querySelector('.selectImage')
      ?.setAttribute('src', this.setUserImg(user.profileImage));
  }

  updateInfo() {
    this.emailUsed = false;
    this.userNameUsed = false;
    this.submittedInfo = true;
    if (!this.updateInfoForm.valid) return;
    this.sharedService.runSpinner(true);

    const userInfo: User = {
      userName: this.updateInfoForm.value.userName,
      fullName: this.updateInfoForm.value.fullName,
      email: this.updateInfoForm.value.email,
      description: this.updateInfoForm.value.description,
      id: 0,
      password: null,
      profileImage: '',
    };
    this.userService.updateProfile(userInfo).subscribe({
      complete: () => {
        const input = document.getElementById(
          'profileImage'
        ) as HTMLInputElement;
        if (input?.files?.length != 0) {
          this.pushImg(input.files?.item(0));
        } else {
          this.getUserProfileInfo();
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

    this.userService
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
    this.imgService.uploadImage('user', img).subscribe({
      complete: () => {
        this.getUserProfileInfo();
        this.sharedService.runSpinner(false);
        this.updatedSuccess();
      },
      error: (error) => {
        this.getUserProfileInfo();
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
      this.passwordForm.value.newPassword != '' &&
      this.passwordForm.value.newPassword == this.passwordForm.value.oldPassword
    );
  }

  /* FUNCTIONS */
  signOut() {
    localStorage.clear();
    this.router.navigate(['/']);
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

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
}
