import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Event } from 'src/app/models/Event';
import { EventService } from '../../../services/event.service';
import { SharedService } from '../../../services/shared.service';
import { ShasicUtils } from '../../../helpers/ShasicUtils';

@Component({
  selector: 'app-events-performed',
  templateUrl: './events-performed.component.html',
  styleUrls: ['./events-performed.component.css'],
})
export class EventsPerformedComponent implements OnInit {
  events: Event[] = [];
  formatDate = ShasicUtils.formatDate;
  constructor(
    private eventService: EventService,
    private sharedService: SharedService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getEventsPerformed();
  }

  getEventsPerformed() {
    this.sharedService.runSpinner(true);
    this.eventService.getEventsPerformed().subscribe({
      next: (response) => {
        this.events = response;
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
