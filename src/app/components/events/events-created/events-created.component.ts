import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { SharedService } from '../../../services/shared.service';
import { ShasicUtils } from '../../../helpers/ShasicUtils';
import { Event } from 'src/app/models/Event';

@Component({
  selector: 'app-events-created',
  templateUrl: './events-created.component.html',
  styleUrls: ['./events-created.component.css'],
})
export class EventsCreatedComponent implements OnInit {
  events: Event[] = [];
  formatDate = ShasicUtils.formatDate;
  constructor(
    private eventService: EventService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.getEventsCretaed();
  }

  getEventsCretaed() {
    this.sharedService.runSpinner(true);
    this.eventService.getEventsCreated().subscribe({
      next: (response) => {
        response.forEach((ev) => {
          ev.eventDate = new Date(ev.eventDate);
        });
        this.events = ShasicUtils.sortByDate(response);
      },
      complete: () => {
        this.sharedService.runSpinner(false);
      },
      error: (error) => {
        this.sharedService.runSpinner(false);
        console.log(error);
        this.sharedService.showError(6000);
      },
    });
  }
}
