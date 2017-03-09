import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule,JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { Routes, RouterModule } from "@angular/router";
import { UserComponent } from './user/user.component';

import { UserSessionService } from "./user-session.service";
import { SeriesService } from "./series.service";

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SeriesSearchComponent } from './series-search/series-search.component';
import { SerieShowComponent } from './serie-show/serie-show.component';

const routes: Routes = [
  { path: '',  component: HomeComponent },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'signup',  component: UserComponent },
  { path: 'login',  component: UserComponent },
  { path: 'profile',  component: UserComponent },
  { path: 'serie/:id', component: SerieShowComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HeaderComponent,
    HomeComponent,
    SeriesSearchComponent,
    SerieShowComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [UserSessionService,SeriesService],
  bootstrap: [AppComponent]
})
export class AppModule {}
