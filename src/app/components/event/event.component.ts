import { Component, OnInit } from '@angular/core';
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
  constructor(
    private router: Router,
    private eventService: EventService,
    private sharedService: SharedService,
    private googleMaps: GoogleMap
  ) {}

  ngOnInit(): void {
    this.getEventById();
    //this.initMap(43.5453, -5.66193);
  }

  initMap(latt: number, lngg: number) {
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
    col1.classList.add('col-xl-6', 'col-sm-12', 'col-md-12', 'col1');

    const eventName = document.createElement('h1');
    eventName.classList.add('cl-purple');
    eventName.innerHTML = ev.eventName;
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
      '<br>' +
      eventDateText.getDate() +
      ' de ' +
      months[eventDateText.getMonth()] +
      ' del ' +
      eventDateText.getFullYear();
    const eventLocation = document.createElement('h5');
    eventLocation.classList.add('text-light');
    eventLocation.innerHTML = ev.eventLocation;
    col1.append(eventDate, eventLocation);
    if (ev.ticketsUrl != null) {
      const eventTickets = document.createElement('a');
      eventTickets.classList.add('text-light');
      eventTickets.innerHTML = '<h5>Comprar entradas</h5>';
      eventTickets.target = '_blank';
      eventTickets.href = ev.ticketsUrl;
      col1.append(eventTickets);
    }

    if (ev.details != null) {
      const details = document.createElement('h5');
      details.innerHTML = '<br>Detalles:';
      details.classList.add('text-light');
      const eventDetails = document.createElement('p');
      eventDetails.classList.add('text-light', 'details');
      eventDetails.innerHTML = ev.details;
      col1.append(details, eventDetails);
    }

    const col2 = document.createElement('div');
    col2.classList.add('col-xl-6', 'col-sm-12', 'col-md-12', 'col2');
    const eventImg = document.createElement('img');
    eventImg.classList.add('eventImg', 'rounded', 'img-thumbnail');
    eventImg.src = ev.eventImage;
    const jump = document.createElement('br');
    const followingButton = document.createElement('button');
    followingButton.classList.add('btn', 'btn-primary');
    followingButton.innerHTML = 'SIGUIENDO';
    const jump2 = document.createElement('br');
    const searchPeopleBtn = document.createElement('button');
    searchPeopleBtn.classList.add('btn', 'btn-warning', 'searchPeopleBtn');
    searchPeopleBtn.innerHTML = 'BUSCA A ALGUIEN';
    col2.append(eventImg, jump, followingButton, jump2, searchPeopleBtn);

    document.getElementById('content')?.append(eventName, col1, col2);
  }
}
