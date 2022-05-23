import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/User';
import { ChatService } from '../../../services/chat.service';

@Component({
  selector: 'app-event-chats',
  templateUrl: './event-chats.component.html',
  styleUrls: ['./event-chats.component.css'],
})
export class EventChatsComponent implements OnInit {
  users: User[] = [];
  constructor(
    private sharedService: SharedService,
    private router: Router,
    private userService: UserService,
    private cdRef: ChangeDetectorRef,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.sharedService.runSpinner(true);
    const id = parseInt(
      this.router.url.substring(this.router.url.lastIndexOf('/') + 1)
    );
    this.userService.getEventUsers(id).subscribe({
      next: (response) => {
        this.users = response;
      },
      complete: () => {
        this.sharedService.runSpinner(false);
      },
      error: (error) => {
        this.sharedService.runSpinner(false);
        console.log(error);
      },
    });
  }

  createChat(targetUserName: string) {
    this.sharedService.runSpinner(true);
    this.chatService.newChat(targetUserName).subscribe({
      next: (response: any) => {
        if (response.status == 'alreadyExisted') {
          this.router.navigate(['/chats/' + targetUserName]);
        } else {
          this.chatService.newFirebaseChat(
            response.chatId,
            response.createdBy,
            targetUserName
          );
          this.router.navigate(['/chats/' + targetUserName]);
        }
      },
      complete: () => {
        this.sharedService.runSpinner(false);
      },
      error: (error) => {
        this.sharedService.runSpinner(false);
        console.log(error);
      },
    });
  }

  reduceUserDesc(desc: string): string {
    if (desc != null && desc.length > 50) {
      return desc.substring(0, 50) + '...';
    }
    return desc;
  }

  setUserImg(img: string) {
    return img == 'default' ? '../../assets/default-user.png' : img;
  }
  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
}
