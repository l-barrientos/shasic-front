import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ShasicUtils } from '../helpers/ShasicUtils';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  httpOptions = {
    headers: new HttpHeaders(),
  };
  autoLoginUrl = environment.apiUrl + '/autoLogin';
  queryUrl = environment.apiUrl + '/search';
  private spinner = new BehaviorSubject(false);
  sharedSpinner = this.spinner.asObservable();
  private error = new BehaviorSubject(false);
  sharedError = this.error.asObservable();
  constructor(private http: HttpClient) {}

  runSpinner(status: boolean) {
    this.spinner.next(status);
  }

  showError(ms: number) {
    this.error.next(true);
    setTimeout(() => this.error.next(false), ms);
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
