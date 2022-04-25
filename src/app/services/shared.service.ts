import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  httpOptions = {
    headers: new HttpHeaders(),
  };
  autoLoginUrl = 'http://localhost:8000/api/autoLogin';
  queryUrl = 'http://localhost:8000/api/search';
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

  getResults(query: string): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        access_token: localStorage.getItem('access_token')!,
        query: query,
      }),
    };

    return this.http.get<any>(this.queryUrl, this.httpOptions);
  }
}
