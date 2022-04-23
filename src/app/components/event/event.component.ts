import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { SharedService } from '../../services/shared.service';
import { Event } from '../../models/Event';
import { PublicArtist } from '../../models/PublicArtist';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  constructor(
    private router: Router,
    private eventService: EventService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.getEventById();
  }

  getEventById() {
    this.sharedService.runSpinner(true);
    const id = parseInt(
      this.router.url.substring(this.router.url.lastIndexOf('/') + 1)
    );
    this.eventService.getEventById(id).subscribe({
      next: (response) => {
        console.log(response);
        this.createEventContent(response);
      },

      complete: () => {
        this.sharedService.runSpinner(false);
      },
      error: (error) => {
        console.log(error);
        this.sharedService.runSpinner(false);
      },
    });
  }

  /*
   *
   *
   *
   */
  createEventContent(response: any) {
    const ev: Event = response.event;
    const artists: PublicArtist[] = response.artists;
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

    const col1 = document.createElement('div');
    col1.classList.add('col-6', 'col-sm-12', 'col-md-12');

    const eventName = document.createElement('h1');
    eventName.classList.add('cl-purple');
    eventName.innerHTML = ev.eventName;
    col1.append(eventName);
    artists.forEach((art) => {
      console.log(art);
      const a = document.createElement('a');
      a.innerHTML = art.fullName + '<br>';
      a.classList.add('band');
      col1.append(a);
      a.addEventListener('click', () => {
        this.router.navigate(['/artist/' + art.id]);
      });
    });
    const eventDateText = new Date(ev.eventDate);
    const eventDate = document.createElement('h5');
    eventDate.classList.add('text-light');
    eventDate.innerHTML =
      eventDateText.getDate() +
      ' de ' +
      months[eventDateText.getMonth()] +
      ' del ' +
      eventDateText.getFullYear();
    const eventLocation = document.createElement('h5');
    eventLocation.classList.add('text-light');
    eventLocation.innerHTML = ev.eventLocation + '<br><br>';
    col1.append(eventDate, eventLocation);
    if (ev.ticketsUrl != null) {
      const eventTickets = document.createElement('a');
      eventTickets.classList.add('text-light', 'row');
      eventTickets.innerHTML = '<h5>Comprar entradas</h5>';
      eventTickets.target = '_blank';
      eventTickets.href = ev.ticketsUrl;
      col1.append(eventTickets);
    }

    const searchPeopleBtn = document.createElement('button');
    searchPeopleBtn.classList.add('btn', 'btn-warning', 'searchPeopleBtn');
    searchPeopleBtn.innerHTML = 'BUSCA A ALGUIEN';

    col1.append(searchPeopleBtn);

    const col2 = document.createElement('div');
    col2.classList.add('col-6', 'col-sm-12', 'col-md-12', 'col2');
    const eventImg = document.createElement('img');
    eventImg.classList.add('eventImg', 'rounded', 'img-thumbnail');
    eventImg.src = ev.eventImage;
    const jump = document.createElement('br');
    const followingButton = document.createElement('button');
    followingButton.classList.add('btn', 'btn-primary');
    followingButton.innerHTML = 'SIGUIENDO';
    col2.append(eventImg, jump, followingButton);

    document.getElementById('content')?.append(col1, col2);
  }
}
