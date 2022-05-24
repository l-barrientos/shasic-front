import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { User } from '../../../models/User';
import { SharedService } from '../../../services/shared.service';
import { ChatService } from '../../../services/chat.service';

@Component({
  selector: 'app-user-chats',
  templateUrl: './user-chats.component.html',
  styleUrls: ['./user-chats.component.css'],
})
export class UserChatsComponent implements OnInit {
  chatsOpened: any[] = [];
  constructor(
    private cdRef: ChangeDetectorRef,
    private sharedService: SharedService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.getOpenedChats();
  }

  getOpenedChats() {
    this.sharedService.runSpinner(true);
    this.chatService.getOpenedChats().subscribe({
      next: (response: any) => {
        this.chatsOpened = response;
      },
      complete: () => {
        this.chatsOpened = this.chatService.getPreviewMessages(
          this.chatsOpened
        );
        this.sharedService.runSpinner(false);
      },
      error: (error) => {
        console.log(error);
        this.sharedService.runSpinner(false);
      },
    });
  }

  reducePreviewMsg(msg: string): string {
    if (msg != null && msg.length > 30) {
      return msg.substring(0, 30) + '...';
    }
    return msg;
  }

  setUserImg(img: string) {
    return img == 'default' ? '../../assets/default-user.png' : img;
  }
  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
}
