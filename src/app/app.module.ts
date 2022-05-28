import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { UnloggedNavbarComponent } from './components/navbars/unlogged-navbar/unlogged-navbar.component';
import { LandingComponent } from './components/landing/landing.component';
import { HomeComponent } from './components/home/home.component';
import { FollowedEventsComponent } from './components/events/followed-events/followed-events.component';
import { EventComponent } from './components/events/event/event.component';
import { ArtistHomeComponent } from './components/artist-home/artist-home.component';
import { ArtistComponent } from './components/artists/artist/artist.component';
import { FollowedArtistsComponent } from './components/artists/followed-artists/followed-artists.component';
import { AllEventsComponent } from './components/events/all-events/all-events.component';
import { AllArtistsComponent } from './components/artists/all-artists/all-artists.component';
import { SearchComponent } from './components/search/search.component';
import { EventChatsComponent } from './components/chats/event-chats/event-chats.component';
import { UserChatsComponent } from './components/chats/user-chats/user-chats.component';
import { ChatComponent } from './components/chats/chat/chat.component';
import { NewEventComponent } from './components/events/new-event/new-event.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { environment } from 'src/environments/environment';
import { UserLoggedNavbarComponent } from './components/navbars/user-logged-navbar/user-logged-navbar.component';
import { ArtistLoggedNavbarComponent } from './components/navbars/artist-logged-navbar/artist-logged-navbar.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ArtistProfileComponent } from './components/artist-profile/artist-profile.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { EventsCreatedComponent } from './components/events/events-created/events-created.component';
import { EventsPerformedComponent } from './components/events/events-performed/events-performed.component';
import { EditEventComponent } from './components/events/edit-event/edit-event.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UnloggedNavbarComponent,
    LandingComponent,
    HomeComponent,
    FollowedEventsComponent,
    EventComponent,
    ArtistHomeComponent,
    ArtistComponent,
    FollowedArtistsComponent,
    AllEventsComponent,
    AllArtistsComponent,
    SearchComponent,
    EventChatsComponent,
    UserChatsComponent,
    ChatComponent,
    NewEventComponent,
    UserLoggedNavbarComponent,
    ArtistLoggedNavbarComponent,
    UserProfileComponent,
    ArtistProfileComponent,
    EventsCreatedComponent,
    EventsPerformedComponent,
    EditEventComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMatFileInputModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
