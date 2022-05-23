import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artist } from '../models/Artist';
import { BACK_URL } from '../helpers/GlobalConstants';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  allArtistsUrl = BACK_URL + '/artists';
  registerUrl = BACK_URL + '/artist/register';
  artistsByUserUrl = BACK_URL + '/userArtists';
  artistByName = BACK_URL + '/artist/';
  followArtistUrl = BACK_URL + '/followArtist/';
  unfollowArtistUrl = BACK_URL + '/unfollowArtist/';
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
}
