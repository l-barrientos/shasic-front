import { Injectable } from '@angular/core';
import { AngularFireObject } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private angularFireDatabase: AngularFireDatabase) {}

  msg: AngularFireObject<any>;

  getMessages(targetUser: string) {
    const msg = this.angularFireDatabase.database.ref('chats/' + targetUser);
    msg.on('value', (snapshot: any) => {
      snapshot.forEach((e: any) => {
        console.log(e.val());
      });
    });
  }
}
