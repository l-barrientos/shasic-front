import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { SharedService } from '../../../services/shared.service';
import { Event } from '../../../models/Event';
import { ShasicUtils } from '../../../helpers/ShasicUtils';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  loadAll = false;
  formatDate = ShasicUtils.formatDate;
  event: Event = {
    id: 0,
    eventName: '',
    eventDate: new Date(),
    artists: [],
    eventImage: '',
    eventLocation: '',
    ticketsUrl: '',
    details: '',
    following: null,
    followers: null,
  };
  rol: string = '';
  editionAllowed = false;
  constructor(
    private router: Router,
    private eventService: EventService,
    private sharedService: SharedService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.rol = localStorage.getItem('rol')!;

    this.getEventById();
  }

  /***********SERVICES*********/

  getEventById() {
    this.sharedService.runSpinner(true);
    const id = parseInt(
      this.router.url.substring(this.router.url.lastIndexOf('/') + 1)
    );
    this.eventService.getEventById(id).subscribe({
      next: (response) => {
        this.event = response;
        this.event.artists = response.artists;
        this.editionAllowed = response.editionAllowed;
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

  followEvent(id: number) {
    this.sharedService.runSpinner(true);
    document.getElementById('followButton')!.innerHTML = '· · ·';
    this.eventService.followEvent(id).subscribe({
      complete: () => {
        this.getEventById();
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
    document.getElementById('followButton')!.innerHTML = '· · ·';
    this.eventService.unfollowEvent(id).subscribe({
      complete: () => {
        this.getEventById();
        this.sharedService.runSpinner(false);
      },
      error: (error) => {
        this.sharedService.runSpinner(false);
        this.sharedService.showError(6000);
      },
    });
  }

  deleteArtistFromEvent() {
    const id = parseInt(
      this.router.url.substring(this.router.url.lastIndexOf('/') + 1)
    );
    this.sharedService.runSpinner(true);
    this.eventService.deleteArtistFromEvent(id).subscribe({
      complete: () => {
        this.sharedService.runSpinner(true);
        if (this.event.artists!.length > 1) {
          this.getEventById();
        } else {
          this.router.navigate(['/artist-home']);
        }
      },
      error: (error) => {
        this.sharedService.runSpinner(false);
        this.sharedService.showError(3000);
        console.log(error);
      },
    });
  }

  /******************HELPERS******** */

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
}
