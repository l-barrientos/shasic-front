import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { PublicArtist } from '../../models/PublicArtist';
import { Event } from '../../models/Event';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  artists: PublicArtist[] = [];
  events: Event[] = [];

  constructor(
    private sharedService: SharedService,
    private actRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.getResults();
  }

  getResults() {
    this.sharedService.runSpinner(true);
    const query = this.actRoute.snapshot.queryParamMap.get('q');
    if (query == null) return;
    this.sharedService.getResults(query).subscribe({
      next: (response) => {
        this.artists = response.artists;
        this.events = response.events;
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

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  followEvent(id: number) {
    this.sharedService.runSpinner(true);
    document.getElementById('followButton' + id)!.innerHTML = '· · ·';
    this.eventService.followEvent(id).subscribe({
      next: (response) => {
        this.getResults();
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
    document.getElementById('followButton' + id)!.innerHTML = '· · ·';
    this.eventService.unfollowEvent(id).subscribe({
      next: (response) => {
        this.getResults();
      },
      complete: () => {
        this.sharedService.runSpinner(false);
      },
      error: (error) => {
        this.sharedService.runSpinner(false);
      },
    });
  }

  /********HELPERS ******/

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
