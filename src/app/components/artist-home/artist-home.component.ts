import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ArtistService } from '../../services/artist.service';
import { Router } from '@angular/router';
import { Event } from 'src/app/models/Event';
import { ShasicUtils } from '../../helpers/ShasicUtils';
import { SharedService } from '../../services/shared.service';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-artist-home',
  templateUrl: './artist-home.component.html',
  styleUrls: ['./artist-home.component.css'],
})
export class ArtistHomeComponent implements OnInit {
  eventsCreated: Event[] = [];
  eventsPerformed: Event[] = [];
  formatDate = ShasicUtils.formatDate;
  constructor(
    private router: Router,
    private sharedService: SharedService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.getEventsCretaed();
    this.getEventsPerformed();
  }

  getEventsCretaed() {
    this.sharedService.runSpinner(true);
    this.eventService.getEventsCreated().subscribe({
      next: (response) => {
        response.forEach((ev) => {
          ev.eventDate = new Date(ev.eventDate);
        });
        this.eventsCreated = ShasicUtils.sortByDate(response);
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

  getEventsPerformed() {
    this.sharedService.runSpinner(true);
    this.eventService.getEventsPerformed().subscribe({
      next: (response) => {
        response.forEach((ev) => {
          ev.eventDate = new Date(ev.eventDate);
        });
        this.eventsPerformed = ShasicUtils.sortByDate(response);
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

  navigate(target: string) {
    this.router.navigate(['/' + target]);
  }
}
