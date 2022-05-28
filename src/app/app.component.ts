import { ChangeDetectorRef, Component } from '@angular/core';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Shasic';

  showSpinner = false;
  showError = false;
  constructor(
    private sharedService: SharedService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.sharedService.sharedSpinner.subscribe((value) => {
      this.showSpinner = value;
    });
    this.sharedService.sharedError.subscribe((value) => {
      this.showError = value;
    });
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
}
