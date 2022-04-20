import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  loginUrl = 'http://localhost:8000/api/login';

  registerUrl = 'http://localhost:8000/api/user/register';

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
}
