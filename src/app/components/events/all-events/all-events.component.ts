import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { EventService } from '../../../services/event.service';
import { Event } from '../../../models/Event';
import { ShasicUtils } from '../../../helpers/ShasicUtils';

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.css'],
})
export class AllEventsComponent implements OnInit {
  events: Event[] = [];
  formatDate = ShasicUtils.formatDate;
  constructor(
    private sharedService: SharedService,
    private eventService: EventService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAllEvents();
  }

  /***********SERVICES*********/

  getAllEvents() {
    this.sharedService.runSpinner(true);
    this.eventService.getAllEvents().subscribe({
      next: (response) => {
        response.forEach((ev: any) => {
          ev.eventDate = new Date(ev.eventDate);
        });
        let yest = new Date();
        yest.setDate(yest.getDate() - 1);
        this.events = ShasicUtils.sortByDate(response).filter(
          (objA) => objA.eventDate > yest
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
  followEvent(id: number) {
    this.sharedService.runSpinner(true);
    document.getElementById('followButton' + id)!.innerHTML = '· · ·';
    this.eventService.followEvent(id).subscribe({
      next: (response) => {
        this.getAllEvents();
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
      next: (response) => {
        this.getAllEvents();
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

  /********HELPERS ******/

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
}
