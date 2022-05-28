import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Artist } from '../../../models/Artist';
import { SharedService } from '../../../services/shared.service';
import { ArtistService } from '../../../services/artist.service';
import { ShasicUtils } from '../../../helpers/ShasicUtils';

@Component({
  selector: 'app-followed-artists',
  templateUrl: './followed-artists.component.html',
  styleUrls: ['./followed-artists.component.css'],
})
export class FollowedArtistsComponent implements OnInit {
  artists: Artist[] = [];
  setArtistImg = ShasicUtils.setArtistImg;
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
        this.sharedService.runSpinner(false);
        this.sharedService.showError(6000);
      },
    });
  }

  unfollowArtist(id: number) {
    this.sharedService.runSpinner(true);
    document.getElementById('followButton' + id)!.innerHTML = '· · ·';
    this.artistService.unfollowArtist(id).subscribe({
      complete: () => {
        this.getArtistsByUser();
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
