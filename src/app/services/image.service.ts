import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  artistUrl = environment.apiUrl + '/artist/img';
  userUrl = environment.apiUrl + '/user/img';
  eventUrl = environment.apiUrl + '/event/img/';
  httpOptions = {
    headers: new HttpHeaders(),
  };
  constructor(private http: HttpClient) {}

  /**
   *
   * @param rol
   * @param img
   * @param eventId (only for Events)
   * @returns
   */
  uploadImage(rol: string, img: any, eventId: number = 0) {
    this.httpOptions = {
      headers: new HttpHeaders({
        access_token: localStorage.getItem('access_token')!,
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
      url = this.eventUrl + eventId;
    }
    return this.http.post(url, formData, this.httpOptions);
  }
}
