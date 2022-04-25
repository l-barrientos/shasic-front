import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingComponent } from './components/landing/landing.component';
import { HomeComponent } from './components/home/home.component';
import { FollowedEventsComponent } from './components/followed-events/followed-events.component';
import { EventComponent } from './components/event/event.component';
import { ArtistHomeComponent } from './components/artist-home/artist-home.component';
import { ArtistComponent } from './components/artist/artist.component';
import { FollowedArtistsComponent } from './components/followed-artists/followed-artists.component';
import { AllEventsComponent } from './components/all-events/all-events.component';

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
  { path: 'artists/:userName', component: ArtistComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
