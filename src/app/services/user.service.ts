import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  loginUrl = 'http://localhost:8000/api/login';

  registerUrl = 'http://localhost:8000/api/user/register';

  eventUsersUrl = 'http://localhost:8000/api/eventUsers/';

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
