import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { Artist } from '../../models/Artist';
import { Event } from '../../models/Event';
import { EventService } from '../../services/event.service';
import { ArtistService } from '../../services/artist.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  artists: Artist[] = [];
  events: Event[] = [];

  constructor(
    private sharedService: SharedService,
    private actRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private eventService: EventService,
    private artistService: ArtistService
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
  followArtist(id: number) {
    this.sharedService.runSpinner(true);
    document.getElementById('followButton' + id)!.innerHTML = '· · ·';
    this.artistService.followArtist(id).subscribe({
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

  unfollowArtist(id: number) {
    this.sharedService.runSpinner(true);
    document.getElementById('followButton' + id)!.innerHTML = '· · ·';
    this.artistService.unfollowArtist(id).subscribe({
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

  setBandImg(img: string) {
    return img == 'default' ? '../../assets/default-band.jpg' : img;
  }

  checkBoxArtists() {
    if (this.events.length > 0 && this.artists.length > 0) {
      const checkBox: any = document.getElementById('aritstsCheckBox');
      return checkBox.checked;
    }
    return true;
  }

  checkBoxEvents() {
    if (this.events.length > 0 && this.artists.length > 0) {
      const checkBox: any = document.getElementById('eventsCheckBox');
      return checkBox.checked;
    }
    return true;
  }
}
