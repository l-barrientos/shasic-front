import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  loginUrl = environment.apiUrl + '/login';
  registerUrl = environment.apiUrl + '/user/register';
  eventUsersUrl = environment.apiUrl + '/eventUsers/';
  userProfileUrl = environment.apiUrl + '/getUserProfile';
  updatePasswordUrl = environment.apiUrl + '/userUpdatePassword';
  updateProfileUrl = environment.apiUrl + '/userUpdateProfile';

  httpOptions = {
    headers: new HttpHeaders(),
  };

  constructor(private http: HttpClient) {}

  login(email: String, password: String): Observable<any> {
    return this.http.post(this.loginUrl, { email: email, password: password });
  }

  register(user: any) {
    return this.http.post(this.registerUrl, {
      email: user.email,
      userName: user.userName,
      password: user.password,
      fullName: user.fullName,
    });
  }

  getEventUsers(eventId: number) {
    this.httpOptions = {
      headers: new HttpHeaders({
        access_token: localStorage.getItem('access_token')!,
      }),
    };
    return this.http.get<User[]>(
      this.eventUsersUrl + eventId,
      this.httpOptions
    );
  }

  getUserProfile() {
    this.httpOptions = {
      headers: new HttpHeaders({
        access_token: localStorage.getItem('access_token')!,
      }),
    };
    return this.http.get<User>(this.userProfileUrl, this.httpOptions);
  }

  updatePassword(oldPassword: string, newPassword: string) {
    this.httpOptions = {
      headers: new HttpHeaders({
        access_token: localStorage.getItem('access_token')!,
      }),
    };
    return this.http.put(
      this.updatePasswordUrl,
      {
        oldPassword: oldPassword,
        newPassword: newPassword,
      },
      this.httpOptions
    );
  }

  updateProfile(user: User) {
    this.httpOptions = {
      headers: new HttpHeaders({
        access_token: localStorage.getItem('access_token')!,
      }),
    };
    return this.http.put(
      this.updateProfileUrl,
      {
        userName: user.userName,
        email: user.email,
        fullName: user.fullName,
        description: user.description,
      },
      this.httpOptions
    );
  }
}
