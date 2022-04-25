import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArtistService } from '../../../services/artist.service';
import { PublicArtist } from '../../../models/PublicArtist';
import { Event } from '../../../models/Event';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css'],
})
export class ArtistComponent implements OnInit {
  artist: PublicArtist = {
    id: 0,
    userName: '',
    email: '',
    fullName: '',
    profileImage: '',
    bio: null,
    eventsNum: null,
    following: null,
    followers: 0,
    location: null,
  };
  events: Event[] = [];
  constructor(
    private router: Router,
    private artistService: ArtistService,
    private cdRef: ChangeDetectorRef,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.getArtistInfo();
  }

  getArtistInfo() {
    this.sharedService.runSpinner(true);
    const userName = this.router.url.substring(
      this.router.url.lastIndexOf('/') + 1
    );
    this.artistService.getArtistByName(userName).subscribe({
      next: (response: any) => {
        this.artist = response.artist;
        response.events.forEach((ev: Event) => {
          ev.eventDate = new Date(ev.eventDate);
        });
        this.events = response.events.sort(
          (objA: any, objB: any) =>
            objA.eventDate.getTime() - objB.eventDate.getTime()
        );

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

  followArtist(id: number) {
    this.sharedService.runSpinner(true);
    document.getElementById('followButton')!.innerHTML = '· · ·';
    this.artistService.followArtist(id).subscribe({
      next: (response) => {
        this.artist.following = response.following;
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
    document.getElementById('followButton')!.innerHTML = '· · ·';
    this.artistService.unfollowArtist(id).subscribe({
      next: (response) => {
        this.artist.following = response.following;
      },
      complete: () => {
        this.sharedService.runSpinner(false);
      },
      error: (error) => {
        this.sharedService.runSpinner(false);
      },
    });
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

  setBandImg(img: string) {
    return img == 'default' ? '../../assets/default-band.jpg' : img;
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
}
