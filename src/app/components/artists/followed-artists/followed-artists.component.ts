import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PublicArtist } from '../../../models/PublicArtist';
import { SharedService } from '../../../services/shared.service';
import { ArtistService } from '../../../services/artist.service';

@Component({
  selector: 'app-followed-artists',
  templateUrl: './followed-artists.component.html',
  styleUrls: ['./followed-artists.component.css'],
})
export class FollowedArtistsComponent implements OnInit {
  artists: PublicArtist[] = [];
  constructor(
    private sharedService: SharedService,
    private artistService: ArtistService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getArtistsByUser();
  }

  /*****SERVICES********* */

  getArtistsByUser() {
    this.sharedService.runSpinner(true);
    this.artistService.getArtistsByUser().subscribe({
      next: (response) => {
        this.artists = response;
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

  unfollowArtist(id: number) {
    this.sharedService.runSpinner(true);
    document.getElementById('followButton' + id)!.innerHTML = '· · ·';
    this.artistService.unfollowArtist(id).subscribe({
      next: (response) => {
        this.getArtistsByUser();
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
  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
}
