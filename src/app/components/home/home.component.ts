import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/Event';
import { SharedService } from '../../services/shared.service';
import { Artist } from '../../models/Artist';
import { ArtistService } from '../../services/artist.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  artistsFollowed: Artist[] = [];
  allArtists: Artist[] = [];
  eventsFollowed: Event[] = [];
  allEvents: Event[] = [];
  constructor(
    private eventService: EventService,
    private sharedService: SharedService,
    private artistService: ArtistService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getEventsByUser();
    this.getArtistsByUser();
    this.getAllEvents();
    this.getAllArtists();
  }

  getEventsByUser() {
    this.sharedService.runSpinner(true);
    this.eventService.getEventsByUser().subscribe({
      next: (response: Event[]) => {
        response.forEach((ev) => {
          ev.eventDate = new Date(ev.eventDate);
        });
        this.eventsFollowed = response.sort(
          (objA, objB) => objA.eventDate.getTime() - objB.eventDate.getTime()
        );
      },
      complete: () => {
        this.sharedService.runSpinner(false);
      },
      error: (error) => {
        this.showError('eventsByUser');
        this.sharedService.runSpinner(false);
      },
    });
  }

  getArtistsByUser() {
    this.sharedService.runSpinner(true);
    this.artistService.getArtistsByUser().subscribe({
      next: (response) => {
        this.artistsFollowed = response;
      },
      complete: () => {
        this.sharedService.runSpinner(false);
      },
      error: (error) => {
        this.showError('artistsByUser');
        this.sharedService.runSpinner(false);
      },
    });
  }

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

  getAllArtists() {
    this.sharedService.runSpinner(true);
    this.artistService.getAllArtists().subscribe({
      next: (response) => {
        this.allArtists = response.sort(
          (objA: any, objB: any) => objB.followers - objA.followers
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

  showError(parentDiv: string) {
    let h2 = document.createElement('h2');
    h2.classList.add('text-danger');
    h2.innerHTML = 'Se ha producido un error';
    document.getElementById(parentDiv)?.append(h2);
  }

  setBandImg(img: string) {
    return img == 'default' ? '../../assets/default-band.jpg' : img;
  }

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
  navigate(target: string) {
    this.router.navigate([target]);
  }
}
