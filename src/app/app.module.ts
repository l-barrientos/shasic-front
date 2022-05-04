import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { UnloggedNavbarComponent } from './components/unlogged-navbar/unlogged-navbar.component';
import { LoggedNavbarComponent } from './components/logged-navbar/logged-navbar.component';
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
import { EventChatsComponent } from './components/event-chats/event-chats.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UnloggedNavbarComponent,
    LoggedNavbarComponent,
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
