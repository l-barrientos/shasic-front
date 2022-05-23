import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { BACK_URL } from '../helpers/GlobalConstants';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  loginUrl = BACK_URL + '/login';
  registerUrl = BACK_URL + '/user/register';
  eventUsersUrl = BACK_URL + '/eventUsers/';

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
}
