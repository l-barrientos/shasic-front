import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
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

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'artist-home', component: ArtistHomeComponent },
  { path: 'events/followed', component: FollowedEventsComponent },
  { path: 'artists/followed', component: FollowedArtistsComponent },
  { path: 'events', component: AllEventsComponent },
  { path: 'events/:id', component: EventComponent },
  { path: 'artists', component: AllArtistsComponent },
  { path: 'artists/:userName', component: ArtistComponent },
  { path: 'search', component: SearchComponent },
  { path: 'event-chats/:id', component: EventChatsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
