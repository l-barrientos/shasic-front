import { Component, OnInit } from '@angular/core';
import { PublicArtist } from '../../../models/PublicArtist';
import { SharedService } from '../../../services/shared.service';
import { ArtistService } from '../../../services/artist.service';

@Component({
  selector: 'app-all-artists',
  templateUrl: './all-artists.component.html',
  styleUrls: ['./all-artists.component.css'],
})
export class AllArtistsComponent implements OnInit {
  artists: PublicArtist[] = [];
  constructor(
    private sharedService: SharedService,
    private artistService: ArtistService
  ) {}

  ngOnInit(): void {
    this.getAllArtists();
  }

  getAllArtists() {
    this.sharedService.runSpinner(true);
    this.artistService.getAllArtists().subscribe({
      next: (response) => {
        this.artists = response.sort(
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

  followArtist(id: number) {
    this.sharedService.runSpinner(true);
    document.getElementById('followButton' + id)!.innerHTML = '· · ·';
    this.artistService.followArtist(id).subscribe({
      next: (response) => {
        this.getAllArtists();
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
        this.getAllArtists();
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
}
