import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { EventService } from '../../../services/event.service';
import { Event } from '../../../models/Event';
import { Router } from '@angular/router';
import { ShasicUtils } from '../../../helpers/ShasicUtils';

@Component({
  selector: 'app-followed-events',
  templateUrl: './followed-events.component.html',
  styleUrls: ['./followed-events.component.css'],
})
export class FollowedEventsComponent implements OnInit {
  events: Event[] = [];
  formatDate = ShasicUtils.formatDate;
  constructor(
    private sharedService: SharedService,
    private eventService: EventService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getEventsByUser();
  }

  getEventsByUser() {
    this.sharedService.runSpinner(true);
    this.eventService.getEventsByUser().subscribe({
      next: (response: Event[]) => {
        response.forEach((ev) => {
          ev.eventDate = new Date(ev.eventDate);
        });
        this.events = response.sort(
          (objA, objB) => objA.eventDate.getTime() - objB.eventDate.getTime()
        );
      },
      complete: () => {
        this.sharedService.runSpinner(false);
      },
      error: (error) => {
        this.sharedService.runSpinner(false);
        this.sharedService.showError(6000);
      },
    });
  }

  unfollowEvent(id: number) {
    this.sharedService.runSpinner(true);
    document.getElementById('followButton' + id)!.innerHTML = '· · ·';
    this.eventService.unfollowEvent(id).subscribe({
      complete: () => {
        this.getEventsByUser();
        this.sharedService.runSpinner(false);
      },
      error: (error) => {
        this.sharedService.runSpinner(false);
        this.sharedService.showError(6000);
      },
    });
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
}
