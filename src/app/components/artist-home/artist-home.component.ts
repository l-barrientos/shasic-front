import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../../services/artist.service';

@Component({
  selector: 'app-artist-home',
  templateUrl: './artist-home.component.html',
  styleUrls: ['./artist-home.component.css'],
})
export class ArtistHomeComponent implements OnInit {
  constructor(private artistService: ArtistService) {}

  ngOnInit(): void {}
}
