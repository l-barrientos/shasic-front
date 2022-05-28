import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ChatService } from '../../../services/chat.service';
import { Router } from '@angular/router';
import { User } from '../../../models/User';
import { Message } from 'src/app/models/Message';
import { SharedService } from '../../../services/shared.service';
import { ShasicUtils } from '../../../helpers/ShasicUtils';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  targetUser: User = {
    id: 0,
    userName: '',
    fullName: '',
    password: null,
    email: '',
    description: null,
    profileImage: '../../assets/default-user.png',
  };
  messages: Message[] = [];
  chatId: number;
  currentUserName: string;
  setUserImg = ShasicUtils.setUserImg;
  @ViewChild('chatBox') private myScrollContainer: ElementRef;
  constructor(
    private router: Router,
    private chatService: ChatService,
    private sharedService: SharedService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getChatInfo();
  }

  getChatInfo() {
    this.sharedService.runSpinner(true);
    const targetUserName = this.router.url.substring(
      this.router.url.lastIndexOf('/') + 1
    );
    this.chatService.getChatInfo(targetUserName).subscribe({
      next: (response: any) => {
        this.currentUserName = response.currentUserName;
        this.targetUser = response.targetUser;
        this.chatId = response.chatId;
        this.getAllMessages(this.chatId);
        this.updateMessages(this.chatId);
      },
      complete: () => {
        this.sharedService.runSpinner(false);
      },
      error: (error) => {
        console.log(error);
        this.sharedService.runSpinner(false);
        this.sharedService.showError(6000);
      },
    });
  }

  getAllMessages(chatId: number) {
    try {
      this.messages = this.chatService.getAllMessages(chatId);
    } catch {
      this.sharedService.showError(6000);
    }
  }

  updateMessages(chatId: number) {
    try {
      this.messages = this.chatService.updateMessages(chatId, this.messages);
    } catch {
      this.sharedService.showError(6000);
    }
  }

  sendMsg() {
    event?.preventDefault();
    const textInput = document.getElementById('inputMsg') as HTMLInputElement;
    if (textInput.value != '' && textInput.value.trim() != '') {
      const newMsg = {
        author: this.currentUserName,
        text: textInput.value,
        date: new Date().toString(),
      };
      try {
        this.chatService.pushMessage(this.chatId, newMsg);
      } catch {
        this.sharedService.showError(6000);
      }
      textInput.value = '';
    }
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  formatDate(input: Date | string) {
    const date = new Date(input);
    return date.getHours() + ':' + date.getMinutes();
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
    this.scrollToBottom();
  }
}
