import { Component, OnInit } from '@angular/core';
import { SeriesService } from "../series.service";
import { UserSessionService } from "../user-session.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  error: string;
  constructor(private session : UserSessionService) {
    session.getEmitter().subscribe((user) => {this.user = user});
   }

  ngOnInit() {
    this.session.isLoggedIn()
     .subscribe(
       (user) => this.successCb(user)
     );
  }

  errorCb(err) {
    this.error = err;
    this.user = null;
  }

  successCb(user) {
  this.user = user;
  this.session.checkLogged(user);
  this.error = null;
  }

}
