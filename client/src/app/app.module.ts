import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { Routes, RouterModule } from "@angular/router";

import { UserSessionService } from "./user-session.service";
import { SeriesService } from "./series.service";

import { HeaderComponent } from './header/header.component';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { SeriesSearchComponent } from './series-search/series-search.component';
import { SerieShowComponent } from './serie-show/serie-show.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  { path: '',  component: LandingComponent },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'signup',  component: SignupComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'logout',  component: LoginComponent },
  { path: 'profile',  component: ProfileComponent },
  { path: 'serie/:id', component: SerieShowComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingComponent,
    HomeComponent,
    SeriesSearchComponent,
    SerieShowComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [UserSessionService,SeriesService],
  bootstrap: [AppComponent]
})
export class AppModule {}
