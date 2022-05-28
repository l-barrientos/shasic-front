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
import { Event } from 'src/app/models/Event';
import { ShasicUtils } from '../../../helpers/ShasicUtils';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css'],
})
export class EditEventComponent implements OnInit {
  MIN_DATE = new Date();
  updateEventForm: FormGroup;
  submitted = false;
  event: Event;
  artistsChosen: any[] = [];
  artistsImported: any[] = [];
  filteredArtists: any[] = [];
  addedStatus = false;
  eventId: number = -1;
  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private artistService: ArtistService,
    private sharedService: SharedService,
    private imgService: ImageService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {
    this.updateEventForm = formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      date: ['', Validators.required],
      ticketsUrl: [''],
      details: [''],
    });
  }
  ngOnInit(): void {
    this.getEvent();
    this.getAllArtists();
  }

  getEvent() {
    const id = parseInt(
      this.router.url.substring(this.router.url.lastIndexOf('/') + 1)
    );
    this.sharedService.runSpinner(true);
    this.eventService.getEventById(id).subscribe({
      next: (response) => {
        this.event = response;
        this.eventId = response.id;

        this.refreshForm(response);
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

  updateEvent() {
    this.submitted = true;
    if (
      !this.updateEventForm.valid ||
      !this.checkDate ||
      this.artistsChosen.length == 0
    ) {
      return;
    }
    this.sharedService.runSpinner(true);
    const event: Event = {
      eventName: this.updateEventForm.value.name,
      eventDate: this.updateEventForm.value.date,
      eventLocation: this.updateEventForm.value.location,
      ticketsUrl: this.updateEventForm.value.ticketsUrl,
      details: this.updateEventForm.value.details,
      artists: this.artistsChosen,
      id: 0,
      eventImage: null,
      followers: null,
      following: null,
    };
    this.eventService.updateEvent(event, this.eventId).subscribe({
      complete: () => {
        const input = document.getElementById('eventImage') as HTMLInputElement;
        if (input?.files?.length != 0) {
          this.pushImg(this.eventId, input.files?.item(0));
        } else {
          this.router.navigate(['/events/' + this.eventId]);
          this.sharedService.runSpinner(false);
        }
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
        this.router.navigate(['/events/' + this.eventId]);
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
    return this.updateEventForm.controls;
  }

  /**
   * Check event date is not a past date
   */
  get checkDate(): boolean {
    if (
      this.updateEventForm.value.date != null &&
      this.updateEventForm.value.date < this.MIN_DATE
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
            objA.userName.toLowerCase().includes(input.value.toLowerCase()) ||
            (objA.fullName.toLowerCase().includes(input.value.toLowerCase()) &&
              !this.artistsChosen.some((objB) => objB.id == objA.id))
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

  refreshForm(event: Event) {
    this.updateEventForm.setValue({
      name: event.eventName,
      location: event.eventLocation,
      date: new Date(event.eventDate),
      ticketsUrl: event.ticketsUrl,
      details: event.details,
    });
    this.artistsChosen = event.artists!;
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
}
