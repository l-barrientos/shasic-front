import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BACK_URL } from '../helpers/GlobalConstants';
import { Message } from '../models/Message';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  newChatUrl = BACK_URL + '/newChat/';
  chatInfoUrl = BACK_URL + '/getChatInfo/';
  loaded = false;
  httpOptions = {
    headers: new HttpHeaders(),
  };
  constructor(
    private angularFireDatabase: AngularFireDatabase,
    private http: HttpClient
  ) {}

  /* FIREBASE*/
  /**
   * Create chat in the firebase database
   * @param chatId
   * @param currentUser
   * @param targetUser
   */
  newFirebaseChat(chatId: number, currentUser: string, targetUser: string) {
    const chats = this.angularFireDatabase.database.ref('chats');
    const openObj = {
      createdAt: new Date().toString(),
      createdBy: currentUser,
      createdWith: targetUser,
    };
    chats.child(chatId.toString()).push(openObj);
  }

  /**
   * Get messages from the firebase database
   * @param targetUser
   */
  getAllMessages(chatId: number): Message[] {
    const chatRef = this.angularFireDatabase.database.ref('chats/' + chatId);
    let msgArray: Message[] = [];
    chatRef.once('value', (snapshot: any) => {
      snapshot.forEach((element: any) => {
        if (
          element.val().hasOwnProperty('text') &&
          element.val().hasOwnProperty('author') &&
          element.val().hasOwnProperty('date')
        ) {
          msgArray.push(element.val());
        }
      });
      this.loaded = true;
    });
    return msgArray;
  }

  /**
   * Update the messages when firebase database is updated
   * @param chatId
   * @param msgArray
   * @returns
   */
  updateMessages(chatId: number, msgArray: Message[]): Message[] {
    const chatRef = this.angularFireDatabase.database
      .ref('chats/' + chatId)
      .limitToLast(1);

    chatRef.on('value', (snapshot: any) => {
      if (this.loaded) {
        snapshot.forEach((element: any) => {
          if (
            element.val().hasOwnProperty('text') &&
            element.val().hasOwnProperty('author') &&
            element.val().hasOwnProperty('date')
          ) {
            msgArray.push(element.val());
          }
        });
      }
    });
    return msgArray;
  }

  pushMessage(chatId: number, msg: Message) {
    const chatRef = this.angularFireDatabase.database.ref('chats/' + chatId);
    chatRef.push(msg);
  }

  /* API-REST */

  /**
   * Create a chat reference in the api-rest database
   * @param targetUserId
   * @returns
   */
  newChat(targetUserName: string) {
    this.httpOptions = {
      headers: new HttpHeaders({
        access_token: localStorage.getItem('access_token')!,
      }),
    };
    return this.http.post(
      this.newChatUrl + targetUserName,
      {},
      this.httpOptions
    );
  }

  /**
   * Get chat info from the api-rest database
   * @param chatId
   */
  getChatInfo(targetUserName: string) {
    this.httpOptions = {
      headers: new HttpHeaders({
        access_token: localStorage.getItem('access_token')!,
      }),
    };

    return this.http.get(this.chatInfoUrl + targetUserName, this.httpOptions);
  }
}
