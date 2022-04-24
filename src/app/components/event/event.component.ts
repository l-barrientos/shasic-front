import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { SharedService } from '../../services/shared.service';
import { Event } from '../../models/Event';
import { PublicArtist } from '../../models/PublicArtist';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  loadAll = false;
  event: Event = {
    id: 0,
    eventName: '',
    eventDate: new Date(),
    eventImage: '',
    eventLocation: '',
    ticketsUrl: '',
    details: '',
    following: null,
    followers: null,
  };
  artists: PublicArtist[] = [];
  allEvents: Event[] = [];
  constructor(
    private router: Router,
    private eventService: EventService,
    private sharedService: SharedService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (
      this.router.url.substring(this.router.url.lastIndexOf('/') + 1) !=
      'events'
    ) {
      this.getEventById();
    } else {
      this.loadAll = true;
    }
  }

  /***********SERVICES*********/

  getAllEvents() {
    this.sharedService.runSpinner(true);
    this.eventService.getAllEvents().subscribe({
      next: (response) => {
        response.forEach((ev: Event) => {
          ev.eventDate = new Date(ev.eventDate);
        });
        this.allEvents = response.sort(
          (objA: Event, objB: Event) =>
            objA.eventDate.getTime() - objB.eventDate.getTime()
        );
      },
      complete: () => {
        this.sharedService.runSpinner(false);
      },
      error: (error) => {
        this.sharedService.runSpinner(false);
      },
    });
  }

  getEventById() {
    this.sharedService.runSpinner(true);
    const id = parseInt(
      this.router.url.substring(this.router.url.lastIndexOf('/') + 1)
    );
    this.eventService.getEventById(id).subscribe({
      next: (response) => {
        this.event = response.event;
        this.artists = response.artists;
      },

      complete: () => {
        this.sharedService.runSpinner(false);
      },
      error: (error) => {
        this.sharedService.runSpinner(false);
      },
    });
  }

  followEvent(id: number) {
    this.sharedService.runSpinner(true);
    document.getElementById('followButton')!.innerHTML = '· · ·';
    this.eventService.followEvent(id).subscribe({
      next: (response) => {
        this.event.following = response.following;
      },
      complete: () => {
        this.sharedService.runSpinner(false);
      },
      error: (error) => {
        this.sharedService.runSpinner(false);
      },
    });
  }

  unfollowEvent(id: number) {
    this.sharedService.runSpinner(true);
    document.getElementById('followButton')!.innerHTML = '· · ·';
    this.eventService.unfollowEvent(id).subscribe({
      next: (response) => {
        this.event.following = response.following;
      },
      complete: () => {
        this.sharedService.runSpinner(false);
      },
      error: (error) => {
        this.sharedService.runSpinner(false);
      },
    });
  }

  /******************HELPERS******** */

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  formatDate(inputDate: Date) {
    const months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    const date = new Date(inputDate);
    return (
      date.getDate() +
      ' de ' +
      months[date.getMonth()] +
      ' del ' +
      date.getFullYear()
    );
  }

  /* initMap(latt: number, lngg: number) {
    const mapOptions = {
      zoom: 14,
      center: { lat: latt, lng: lngg },
    };
    this.googleMaps.options = mapOptions;

    let map = new google.maps.Map(document.getElementById('map')!, mapOptions);
    this.googleMaps.center;
    const marker = new google.maps.Marker({
      position: { lat: latt, lng: lngg },
      map: map,
    });
    const infowindow = new google.maps.InfoWindow({
      content: '<p>Marker Location:' + marker.getPosition() + '</p>',
    });

    google.maps.event.addListener(marker, 'click', () => {
      infowindow.open(map, marker);
    });
  } */
}
