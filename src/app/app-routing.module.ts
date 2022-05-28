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
import { EventChatsComponent } from './components/chats/event-chats/event-chats.component';
import { UserChatsComponent } from './components/chats/user-chats/user-chats.component';
import { ChatComponent } from './components/chats/chat/chat.component';
import { NewEventComponent } from './components/events/new-event/new-event.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ArtistProfileComponent } from './components/artist-profile/artist-profile.component';
import { EventsCreatedComponent } from './components/events/events-created/events-created.component';
import { EditEventComponent } from './components/events/edit-event/edit-event.component';
import { EventsPerformedComponent } from './components/events/events-performed/events-performed.component';

const routes: Routes = [
  // Unlogged User
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  //Profile
  { path: 'profile', component: UserProfileComponent },
  { path: 'artist-profile', component: ArtistProfileComponent },

  //Home
  { path: 'home', component: HomeComponent },
  { path: 'artist-home', component: ArtistHomeComponent },

  //Events
  { path: 'events', component: AllEventsComponent },
  { path: 'events/followed', component: FollowedEventsComponent },
  { path: 'events/created', component: EventsCreatedComponent },
  { path: 'events/performed', component: EventsPerformedComponent },
  { path: 'edit-event/:id', component: EditEventComponent },
  { path: 'events/:id', component: EventComponent },
  { path: 'new-event', component: NewEventComponent },

  //Artists
  { path: 'artists', component: AllArtistsComponent },
  { path: 'artists/followed', component: FollowedArtistsComponent },
  { path: 'artists/:userName', component: ArtistComponent },

  //Chats
  { path: 'event-chats/:id', component: EventChatsComponent },
  { path: 'chats', component: UserChatsComponent },
  { path: 'chats/:userName', component: ChatComponent },

  //Search
  { path: 'search', component: SearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
