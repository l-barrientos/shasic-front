import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/Event';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  httpOptions = {
    headers: new HttpHeaders(),
  };
  allEventsUrl = 'http://localhost:8000/api/events';
  eventsByUserUrl = 'http://localhost:8000/api/userEvents';
  eventByIdUrl = 'http://localhost:8000/api/event/';
  followEventUrl = 'http://localhost:8000/api/followEvent/';
  unfollowEventUrl = 'http://localhost:8000/api/unfollowEvent/';
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
