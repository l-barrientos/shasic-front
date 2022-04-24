import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artist } from '../models/Artist';
import { PublicArtist } from '../models/PublicArtist';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  allArtistsUrl = 'http://localhost:8000/api/artists';
  registerUrl = 'http://localhost:8000/api/artist/register';
  artistsByUserUrl = 'http://localhost:8000/api/userArtists';
  artistByName = 'http://localhost:8000/api/artist/';
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

  getAllArtists(): Observable<PublicArtist[]> {
    this.httpOptions = {
      headers: new HttpHeaders({
        access_token: localStorage.getItem('access_token')!,
      }),
    };

    return this.http.get<PublicArtist[]>(this.allArtistsUrl, this.httpOptions);
  }
  getArtistsByUser(): Observable<PublicArtist[]> {
    this.httpOptions = {
      headers: new HttpHeaders({
        access_token: localStorage.getItem('access_token')!,
      }),
    };

    return this.http.get<PublicArtist[]>(
      this.artistsByUserUrl,
      this.httpOptions
    );
  }

  getArtistByName(name: string): Observable<PublicArtist> {
    this.httpOptions = {
      headers: new HttpHeaders({
        access_token: localStorage.getItem('access_token')!,
      }),
    };
    return this.http.get<PublicArtist>(
      this.artistByName + name,
      this.httpOptions
    );
  }
}
