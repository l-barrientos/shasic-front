import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private spinner = new BehaviorSubject(false);
  sharedSpinner = this.spinner.asObservable();
  constructor() {}

  runSpinner(status: boolean) {
    this.spinner.next(status);
  }
}
