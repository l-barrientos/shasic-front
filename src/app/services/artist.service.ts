import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artist } from '../models/Artist';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  allArtistsUrl = environment.apiUrl + '/artists';
  registerUrl = environment.apiUrl + '/artist/register';
  artistsByUserUrl = environment.apiUrl + '/userArtists';
  artistByName = environment.apiUrl + '/artist/';
  followArtistUrl = environment.apiUrl + '/followArtist/';
  unfollowArtistUrl = environment.apiUrl + '/unfollowArtist/';
  artistsIdsUrl = environment.apiUrl + '/artistsIds';
  httpOptions = {
    headers: new HttpHeaders(),
  };

  constructor(private http: HttpClient) {}

  register(artist: any) {
    return this.http.post(this.registerUrl, {
      email: artist.email,
      userName: artist.userName,
      password: artist.password,
      fullName: artist.fullName,
    });
  }

  getAllArtists(): Observable<Artist[]> {
    this.httpOptions = {
      headers: new HttpHeaders({
        access_token: localStorage.getItem('access_token')!,
      }),
    };

    return this.http.get<Artist[]>(this.allArtistsUrl, this.httpOptions);
  }
  getArtistsByUser(): Observable<Artist[]> {
    this.httpOptions = {
      headers: new HttpHeaders({
        access_token: localStorage.getItem('access_token')!,
      }),
    };
    return this.http.get<Artist[]>(this.artistsByUserUrl, this.httpOptions);
  }

  getArtistByName(name: string): Observable<Artist> {
    this.httpOptions = {
      headers: new HttpHeaders({
        access_token: localStorage.getItem('access_token')!,
      }),
    };
    return this.http.get<Artist>(this.artistByName + name, this.httpOptions);
  }

  followArtist(id: number): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        access_token: localStorage.getItem('access_token')!,
      }),
    };
    return this.http.get(this.followArtistUrl + id, this.httpOptions);
  }

  unfollowArtist(id: number): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        access_token: localStorage.getItem('access_token')!,
      }),
    };
    return this.http.delete(this.unfollowArtistUrl + id, this.httpOptions);
  }

  getAllArtistsIds(): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        access_token: localStorage.getItem('access_token')!,
      }),
    };
    return this.http.get<[]>(this.artistsIdsUrl, this.httpOptions);
  }
}
