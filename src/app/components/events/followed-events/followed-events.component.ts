import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { EventService } from '../../../services/event.service';
import { Event } from '../../../models/Event';
import { Router } from '@angular/router';

@Component({
  selector: 'app-followed-events',
  templateUrl: './followed-events.component.html',
  styleUrls: ['./followed-events.component.css'],
})
export class FollowedEventsComponent implements OnInit {
  events: Event[] = [];
  constructor(
    private sharedService: SharedService,
    private eventService: EventService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getEventsByUser();
  }

  getEventsByUser() {
    this.sharedService.runSpinner(true);
    this.eventService.getEventsByUser().subscribe({
      next: (response: Event[]) => {
        response.forEach((ev) => {
          ev.eventDate = new Date(ev.eventDate);
        });
        this.events = response.sort(
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

  unfollowEvent(id: number) {
    this.sharedService.runSpinner(true);
    document.getElementById('followButton' + id)!.innerHTML = '· · ·';
    this.eventService.unfollowEvent(id).subscribe({
      next: (response) => {
        this.getEventsByUser();
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
    const h2 = document.createElement('h2');
    h2.classList.add('text-danger');
    h2.innerHTML = 'Se ha producido un error';
    document.getElementById(parentDiv)?.append(h2);
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
}
