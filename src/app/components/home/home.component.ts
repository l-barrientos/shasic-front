import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/Event';
import { SharedService } from '../../services/shared.service';
import { PublicArtist } from '../../models/PublicArtist';
import { ArtistService } from '../../services/artist.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private eventService: EventService,
    private sharedService: SharedService,
    private artistService: ArtistService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEventsByUser();
    this.getArtistsByUser();
  }

  getEventsByUser() {
    this.sharedService.runSpinner(true);
    this.eventService.getEventsByUser().subscribe({
      next: (response) => {
        response.length > 0
          ? this.createEventCards('eventsByUser', response)
          : this.notFollowedEvents();
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
        response.length > 0
          ? this.createArtistCards('artistsByUser', response)
          : this.notFollowedArtists();
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

  createEventCards(parentDiv: string, events: Event[]) {
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
    let cont = 0;
    events.forEach((ev) => {
      if (cont == 4) return;
      cont++;
      const cardDiv = document.createElement('div');
      cardDiv.classList.add('card', 'col-3');
      cardDiv.style.width = '18rem';

      cardDiv.onclick = () => {
        this.router.navigate(['/event/' + ev.id]);
      };
      const cardImg = document.createElement('img');
      cardImg.src = ev.eventImage;
      cardImg.classList.add('card-img-top');
      const cardBodyDiv = document.createElement('div');
      cardBodyDiv.classList.add('card-body');
      const cardTitle = document.createElement('h5');
      cardTitle.classList.add('card-title', 'bg-lightpurple');
      cardTitle.innerHTML = ev.eventName;
      const cardText = document.createElement('p');
      cardText.classList.add('card-text');
      const eventDate = new Date(ev.eventDate);
      cardText.innerHTML =
        eventDate.getDate() +
        ' de ' +
        months[eventDate.getMonth()] +
        ' del ' +
        eventDate.getFullYear() +
        '<br>' +
        ev.eventLocation;

      cardBodyDiv.append(cardTitle, cardText);
      cardDiv.append(cardImg, cardBodyDiv);
      document.getElementById(parentDiv)?.append(cardDiv);
    });
  }

  createArtistCards(parentDiv: string, artists: PublicArtist[]) {
    let cont = 0;
    artists.forEach((ar) => {
      if (cont == 4) return;
      cont++;
      const cardDiv = document.createElement('div');
      cardDiv.classList.add('card', 'col-3');
      cardDiv.style.width = '18rem';
      cardDiv.onclick = () => {
        this.router.navigate(['/artist']);
      };
      const cardImg = document.createElement('img');
      cardImg.src = '../../../assets/home-concert.png';
      cardImg.classList.add('card-img-top');
      const cardBodyDiv = document.createElement('div');
      cardBodyDiv.classList.add('card-body');
      const cardTitle = document.createElement('h5');
      cardTitle.classList.add('card-title', 'bg-lightpurple');
      cardTitle.innerHTML = ar.fullName;
      const cardText = document.createElement('p');
      cardText.classList.add('card-text');
      cardText.innerHTML = 'Número de eventos: ' + ar.eventsNum;

      cardBodyDiv.append(cardTitle, cardText);
      cardDiv.append(cardImg, cardBodyDiv);
      document.getElementById(parentDiv)?.append(cardDiv);
    });
  }

  notFollowedEvents() {
    let h2 = document.createElement('h2');
    h2.classList.add('cl-lightpurple');
    h2.innerHTML = 'Todavía no sigues ningún evento...';
    document.getElementById('eventsByUser')?.append(h2);
  }

  notFollowedArtists() {
    let h2 = document.createElement('h2');
    h2.classList.add('cl-lightpurple');
    h2.innerHTML = 'Todavía no sigues a ningún artista...';
    document.getElementById('artistsByUser')?.append(h2);
  }

  showError(parentDiv: string) {
    let h2 = document.createElement('h2');
    h2.classList.add('text-danger');
    h2.innerHTML = 'Se ha producido un error';
    document.getElementById(parentDiv)?.append(h2);
  }
}
