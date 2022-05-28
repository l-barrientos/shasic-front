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
      newPassword: ['', [Validators.required, Validators.pattern]],
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
    this.submittedInfo = true;
  }

  updatePassword() {
    this.submittedPassword = true;
  }

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

  signOut() {
    localStorage.clear();
    this.router.navigate(['/']);
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
