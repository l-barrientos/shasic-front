import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-event-chats',
  templateUrl: './event-chats.component.html',
  styleUrls: ['./event-chats.component.css'],
})
export class EventChatsComponent implements OnInit {
  constructor(
    private sharedService: SharedService,
    private router: Router,
    private userService: UserService
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
        console.log(response);
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
}
