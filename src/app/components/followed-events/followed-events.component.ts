import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/Event';

@Component({
  selector: 'app-followed-events',
  templateUrl: './followed-events.component.html',
  styleUrls: ['./followed-events.component.css'],
})
export class FollowedEventsComponent implements OnInit {
  constructor(
    private sharedService: SharedService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.getEventsByUser();
  }

  getEventsByUser() {
    this.sharedService.runSpinner(true);
    this.eventService.getEventsByUser().subscribe({
      next: (response: Event[]) => {
        this.createEventElement(response);
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

  showError(parentDiv: string) {
    const h2 = document.createElement('h2');
    h2.classList.add('text-danger');
    h2.innerHTML = 'Se ha producido un error';
    document.getElementById(parentDiv)?.append(h2);
  }

  createEventElement(events: Event[]) {
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
    events.forEach((ev) => {
      const eventParentDiv = document.createElement('div');
      eventParentDiv.classList.add('eventParentDiv', 'row');
      const col1 = document.createElement('div');
      col1.classList.add('col-6', 'col-sm-12', 'col-md-12');

      const eventName = document.createElement('h2');
      eventName.classList.add('text-light');
      eventName.innerHTML = ev.eventName;
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
      col1.append(eventName, eventDate, eventLocation);
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

      eventParentDiv.append(col1, col2);
      const hr = document.createElement('hr');
      document.getElementById('content')?.append(eventParentDiv, hr);
    });
  }
}
