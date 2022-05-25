import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EventService } from '../../../services/event.service';
import { ArtistService } from '../../../services/artist.service';
import { SharedService } from '../../../services/shared.service';
import { ImageService } from '../../../services/image.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css'],
})
export class NewEventComponent implements OnInit {
  newEventForm: FormGroup;
  submitted = false;
  artistsImported: any[] = [];
  artistsChoosen: any[] = [];
  filteredArtists: any[] = [];
  validFileExtension = false;
  addedStatus = false;
  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private artistService: ArtistService,
    private sharedService: SharedService,
    private imgService: ImageService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {
    this.newEventForm = formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      date: ['', Validators.required],
      ticketsUrl: [''],
      details: [''],
    });
  }
  ngOnInit(): void {
    this.getAllArtists();
  }

  getAllArtists() {
    this.sharedService.runSpinner(true);
    this.artistService.getAllArtistsIds().subscribe({
      next: (response) => {
        console.log(response);
        this.artistsImported = response;
      },
      complete: () => {
        this.sharedService.runSpinner(false);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  newEvent() {
    this.submitted = true;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.newEventForm.controls;
  }

  filterArtists() {
    const input = document.getElementById('filterArtist')! as HTMLInputElement;
    if (input.value.trim() != '') {
      this.filteredArtists = this.artistsImported.filter((objA) =>
        objA.userName.includes(input.value)
      );
    } else {
      this.filteredArtists = [];
    }
  }

  async addChoosenArtist(artist: any) {
    if (!this.artistsChoosen.some((obj) => obj.id == artist.id)) {
      this.artistsChoosen.push(artist);
      const addedStatus = document.getElementById(
        'addedStatus'
      )! as HTMLInputElement;
      addedStatus.style.display = 'block';
      await this.delay(1000);
      addedStatus.style.display = 'none';
    }
  }
  removeChoosenArtist(id: number) {
    this.artistsChoosen = this.artistsChoosen.filter((obj) => obj.id != id);
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
}
