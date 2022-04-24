import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  httpOptions = {
    headers: new HttpHeaders(),
  };
  autoLoginUrl = 'http://localhost:8000/api/autoLogin';
  private spinner = new BehaviorSubject(false);
  sharedSpinner = this.spinner.asObservable();
  constructor(private http: HttpClient) {}

  runSpinner(status: boolean) {
    this.spinner.next(status);
  }

  autoLogin() {
    this.httpOptions = {
      headers: new HttpHeaders({
        access_token: localStorage.getItem('access_token')!,
      }),
    };

    return this.http.get<any>(this.autoLoginUrl, this.httpOptions);
  }
}
