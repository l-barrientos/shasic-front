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
  newEventUrl = environment.apiUrl + '/newEvent';
  eventsPeformedUrl = environment.apiUrl + '/getEventsPerformed';
  eventsCreatedUrl = environment.apiUrl + '/getEventsCreated';
  updateEventUrl = environment.apiUrl + '/updateEvent/';
  checkEditionAllowedUrl = environment.apiUrl + '/checkEventEdition/';
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

  newEvent(event: Event) {
    this.httpOptions = {
      headers: new HttpHeaders({
        access_token: localStorage.getItem('access_token')!,
      }),
    };
    event.eventDate.setDate(event.eventDate.getDate() + 1);
    return this.http.post(
      this.newEventUrl,
      {
        eventName: event.eventName,
        eventDate: event.eventDate.toISOString().slice(0, 19).replace('T', ' '),
        eventLocation: event.eventLocation,
        ticketsUrl: event.ticketsUrl,
        details: event.details,
        artists: event.artists,
      },
      this.httpOptions
    );
  }

  getEventsPerformed() {
    this.httpOptions = {
      headers: new HttpHeaders({
        access_token: localStorage.getItem('access_token')!,
      }),
    };
    return this.http.get<Event[]>(this.eventsPeformedUrl, this.httpOptions);
  }

  getEventsCreated() {
    this.httpOptions = {
      headers: new HttpHeaders({
        access_token: localStorage.getItem('access_token')!,
      }),
    };
    return this.http.get<Event[]>(this.eventsCreatedUrl, this.httpOptions);
  }

  updateEvent(event: Event, id: number) {
    this.httpOptions = {
      headers: new HttpHeaders({
        access_token: localStorage.getItem('access_token')!,
      }),
    };
    event.eventDate.setDate(event.eventDate.getDate() + 1);
    return this.http.put(
      this.updateEventUrl + id,
      {
        eventName: event.eventName,
        eventDate: event.eventDate.toISOString().slice(0, 19).replace('T', ' '),
        eventLocation: event.eventLocation,
        ticketsUrl: event.ticketsUrl,
        details: event.details,
        artists: event.artists,
      },
      this.httpOptions
    );
  }

  checkEditionAllowed(id: number) {
    this.httpOptions = {
      headers: new HttpHeaders({
        access_token: localStorage.getItem('access_token')!,
      }),
    };
    return this.http.get<any>(
      this.checkEditionAllowedUrl + id,
      this.httpOptions
    );
  }
}
