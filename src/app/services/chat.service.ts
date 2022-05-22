import { Injectable } from '@angular/core';
import { AngularFireObject } from '@angular/fire/compat/database';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  newChatUrl = 'http://localhost:8000/api/newChat/';

  httpOptions = {
    headers: new HttpHeaders(),
  };

  constructor(
    private angularFireDatabase: AngularFireDatabase,
    private http: HttpClient
  ) {}

  /* FIREBASE*/

  newFirebaseChat(chatId: number) {
    const chats = this.angularFireDatabase.database.ref('chats');
    const openObj = {
      createdAt: new Date().toString(),
    };
    chats.child(chatId.toString()).push(openObj);
  }

  /**
   * Get messages from the firebase database
   * @param targetUser
   */
  getMessages(targetUser: string) {
    const msg = this.angularFireDatabase.database.ref('chats/' + targetUser);
    msg.on('value', (snapshot: any) => {
      snapshot.forEach((e: any) => {
        console.log(e.val());
      });
    });
  }

  /* API-REST */

  /**
   * Create a chat reference in the api-rest database
   * @param targetUserId
   * @returns
   */
  newChat(targetUserId: number) {
    this.httpOptions = {
      headers: new HttpHeaders({
        access_token: localStorage.getItem('access_token')!,
      }),
    };
    return this.http.post(this.newChatUrl + targetUserId, {}, this.httpOptions);
  }
}
