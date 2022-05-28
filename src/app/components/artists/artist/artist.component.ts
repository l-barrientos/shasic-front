import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArtistService } from '../../../services/artist.service';
import { Artist } from '../../../models/Artist';
import { Event } from '../../../models/Event';
import { SharedService } from '../../../services/shared.service';
import { ShasicUtils } from '../../../helpers/ShasicUtils';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css'],
})
export class ArtistComponent implements OnInit {
  artist: Artist = {
    id: 0,
    userName: '',
    email: '',
    fullName: '',
    profileImage: '',
    bio: null,
    events: [],
    following: null,
    followers: 0,
    location: null,
    password: null,
  };
  formatDate = ShasicUtils.formatDate;
  setArtistImg = ShasicUtils.setArtistImg;
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
        this.artist = response;
        response.events.forEach((ev: Event) => {
          ev.eventDate = new Date(ev.eventDate);
        });
        this.artist.events = response.events.sort(
          (objA: any, objB: any) =>
            objA.eventDate.getTime() - objB.eventDate.getTime()
        );
      },
      complete: () => {
        this.sharedService.runSpinner(false);
      },
      error: (error) => {
        console.log(error);
        this.sharedService.runSpinner(false);
        this.sharedService.showError(6000);
      },
    });
  }

  followArtist(id: number) {
    this.sharedService.runSpinner(true);
    document.getElementById('followButton')!.innerHTML = '· · ·';
    this.artistService.followArtist(id).subscribe({
      complete: () => {
        this.getArtistInfo();
        this.sharedService.runSpinner(false);
      },
      error: (error) => {
        this.sharedService.runSpinner(false);
        this.sharedService.showError(6000);
      },
    });
  }

  unfollowArtist(id: number) {
    this.sharedService.runSpinner(true);
    document.getElementById('followButton')!.innerHTML = '· · ·';
    this.artistService.unfollowArtist(id).subscribe({
      complete: () => {
        this.getArtistInfo();
        this.sharedService.runSpinner(false);
      },
      error: (error) => {
        this.sharedService.runSpinner(false);
        this.sharedService.showError(6000);
      },
    });
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
}
