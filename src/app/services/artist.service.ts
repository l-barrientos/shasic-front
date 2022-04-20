import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  registerUrl = 'http://localhost:8000/api/artist/register';

  constructor(private http: HttpClient) {}

  register(artist: any) {
    return this.http.post(this.registerUrl, {
      email: artist.email,
      userName: artist.userName,
      password: artist.password,
      fullName: artist.fullName,
    });
  }
}
