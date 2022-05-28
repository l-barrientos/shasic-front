import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { User } from '../../../models/User';
import { SharedService } from '../../../services/shared.service';
import { ChatService } from '../../../services/chat.service';
import { ShasicUtils } from '../../../helpers/ShasicUtils';

@Component({
  selector: 'app-user-chats',
  templateUrl: './user-chats.component.html',
  styleUrls: ['./user-chats.component.css'],
})
export class UserChatsComponent implements OnInit {
  chatsOpened: any[] = [];
  setUserImg = ShasicUtils.setUserImg;
  reducePreviewMsg = ShasicUtils.reduceString;
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
        try {
          this.chatsOpened = this.chatService.getPreviewMessages(
            this.chatsOpened
          );
        } catch {
          this.sharedService.showError(6000);
        }
        this.sharedService.runSpinner(false);
      },
      error: (error) => {
        console.log(error);
        this.sharedService.runSpinner(false);
        this.sharedService.showError(6000);
      },
    });
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
}
