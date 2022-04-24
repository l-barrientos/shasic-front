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
import { FollowedEventsComponent } from './components/followed-events/followed-events.component';
import { EventComponent } from './components/event/event.component';
import { ArtistHomeComponent } from './components/artist-home/artist-home.component';

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
