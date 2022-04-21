import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artist } from '../models/Artist';
import { PublicArtist } from '../models/PublicArtist';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  registerUrl = 'http://localhost:8000/api/artist/register';
  artistsByUserUrl = 'http://localhost:8000/api/userArtists';
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

  getArtistsByUser(): Observable<any> {
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
}
