import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BACK_URL } from '../helpers/GlobalConstants';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  artistUrl = BACK_URL + '/artist/img';
  userUrl = BACK_URL + '/user/img';
  eventUrl = BACK_URL + '/event/img';
  httpOptions = {
    headers: new HttpHeaders(),
  };
  constructor(private http: HttpClient) {}

  uploadImage(rol: string, img: any) {
    const token = localStorage.getItem('access_token')!;
    this.httpOptions = {
      headers: new HttpHeaders({
        access_token: token,
      }),
    };
    const formData = new FormData();
    formData.append('image', img);
    let url = '';
    if (rol == 'user') {
      url = this.userUrl;
    } else if (rol == 'artist') {
      url = this.artistUrl;
    } else if (rol == 'event') {
      url = this.eventUrl;
    }
    return this.http.post(url, formData, this.httpOptions);
  }
}
