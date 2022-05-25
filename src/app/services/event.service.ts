import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/Event';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  httpOptions = {
    headers: new HttpHeaders(),
  };
  allEventsUrl = environment.apiUrl + '/events';
  eventsByUserUrl = environment.apiUrl + '/userEvents';
  eventByIdUrl = environment.apiUrl + '/event/';
  followEventUrl = environment.apiUrl + '/followEvent/';
  unfollowEventUrl = environment.apiUrl + '/unfollowEvent/';
  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        access_token: localStorage.getItem('access_token')!,
      }),
    };

    return this.http.get<Event[]>(this.allEventsUrl, this.httpOptions);
  }
  getEventsByUser(): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        access_token: localStorage.getItem('access_token')!,
      }),
    };

    return this.http.get<Event[]>(this.eventsByUserUrl, this.httpOptions);
  }

  getEventById(id: number): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        access_token: localStorage.getItem('access_token')!,
      }),
    };
    return this.http.get<Event>(this.eventByIdUrl + id, this.httpOptions);
  }

  followEvent(id: number): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        access_token: localStorage.getItem('access_token')!,
      }),
    };
    return this.http.get(this.followEventUrl + id, this.httpOptions);
  }

  unfollowEvent(id: number): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        access_token: localStorage.getItem('access_token')!,
      }),
    };
    return this.http.delete(this.unfollowEventUrl + id, this.httpOptions);
  }
}
