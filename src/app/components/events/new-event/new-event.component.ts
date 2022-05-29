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
import { Event } from '../../../models/Event';
import { ObjectUnsubscribedError } from 'rxjs';
import { ShasicUtils } from '../../../helpers/ShasicUtils';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css'],
})
export class NewEventComponent implements OnInit {
  MIN_DATE = new Date();
  newEventForm: FormGroup;
  submitted = false;
  artistsImported: any[] = [];
  artistsChosen: any[] = [];
  filteredArtists: any[] = [];
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
      eventImage: [''],
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
        this.artistsImported = response;
      },
      complete: () => {
        this.sharedService.runSpinner(false);
      },
      error: (error) => {
        this.sharedService.runSpinner(false);
        console.log(error);
        this.sharedService.showError(6000);
      },
    });
  }

  newEvent() {
    this.submitted = true;
    if (
      !this.newEventForm.valid ||
      !this.checkDate ||
      !this.validFileExtension ||
      !this.imagePicked ||
      this.artistsChosen.length == 0
    ) {
      return;
    }
    this.sharedService.runSpinner(true);
    const event: Event = {
      eventName: this.newEventForm.value.name,
      eventDate: this.newEventForm.value.date,
      eventLocation: this.newEventForm.value.location,
      ticketsUrl: this.newEventForm.value.ticketsUrl,
      details: this.newEventForm.value.details,
      artists: this.artistsChosen,
      id: 0,
      eventImage: null,
      followers: null,
      following: null,
    };
    this.eventService.newEvent(event).subscribe({
      next: (response: any) => {
        const input = document.getElementById('eventImage') as HTMLInputElement;
        this.pushImg(response.id, input.files?.item(0));
      },
      complete: () => {
        this.sharedService.runSpinner(false);
      },
      error: (error) => {
        this.sharedService.runSpinner(false);
        console.log(error);
        this.sharedService.showError(6000);
      },
    });
  }

  pushImg(eventId: number, img: any) {
    this.sharedService.runSpinner(true);
    this.imgService.uploadImage('event', img, eventId).subscribe({
      complete: () => {
        this.sharedService.runSpinner(false);
        this.router.navigate(['/events/' + eventId]);
      },
      error: (error) => {
        this.sharedService.runSpinner(false);
        console.log(error);
        this.sharedService.showError(6000);
      },
    });
  }
  /* VALIDATONS */

  /**
   * Standard validator
   */
  get f(): { [key: string]: AbstractControl } {
    return this.newEventForm.controls;
  }

  /**
   * Check event date is not a past date
   */
  get checkDate(): boolean {
    if (
      this.newEventForm.value.date != null &&
      this.newEventForm.value.date < this.MIN_DATE
    ) {
      return false;
    }
    return true;
  }

  /**
   * Check valid file extension on image input
   */
  get validFileExtension(): boolean {
    const regex = /(?:jpeg|jpg|png)/i;
    const input: any = document.getElementById('eventImage');
    if (input.files[0] && !regex.test(input.files[0].name)) {
      return false;
    }
    return true;
  }

  /**
   * Check if an image has been picked
   */
  get imagePicked(): boolean {
    const input: any = document.getElementById('eventImage');
    if (!input.files[0]) {
      return false;
    }
    return true;
  }

  /* FUNCTIONS */

  /**
   * Filter from the imported artists
   */
  filterArtists() {
    const input = document.getElementById('filterArtist')! as HTMLInputElement;
    if (input.value.trim() != '') {
      this.filteredArtists = this.artistsImported
        .filter(
          (objA) =>
            objA.userName.includes(input.value) &&
            !this.artistsChosen.some((objB) => objB.id == objA.id)
        )
        .slice(0, 9);
    } else {
      this.filteredArtists = [];
    }
  }

  /**
   * Add an artists to the chosen artists list
   * @param artist
   */
  async addChosenArtist(artist: any) {
    if (!this.artistsChosen.some((obj) => obj.id == artist.id)) {
      this.artistsChosen.push(artist);
      const addedStatus = document.getElementById(
        'addedStatus'
      )! as HTMLInputElement;
      addedStatus.style.display = 'block';
      await ShasicUtils.delay(1000);
      addedStatus.style.display = 'none';
    }
  }

  /**
   * Remove an artist form the chosen artists list
   * @param id
   */
  removeChosenArtist(id: number) {
    this.artistsChosen = this.artistsChosen.filter((obj) => obj.id != id);
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
}
