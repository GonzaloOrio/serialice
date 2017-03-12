import { Component, OnInit } from '@angular/core';
import { SeriesService } from "../series.service";
import { UserSessionService } from "../user-session.service";
import {Router, ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserSessionService]
})
export class ProfileComponent implements OnInit {
  user: any;
  error: string;
  constructor(private session : UserSessionService, private route: ActivatedRoute) {
    // session.getEmitter().subscribe((user) => {this.user = user});
   }

  ngOnInit() {
    this.session.isLoggedIn()
     .subscribe(
       (user) => this.successCb(user)
     );
     console.log("user" + this.user);
    //  this.route.params
    //    .map(params => params['user'])
    //    .switchMap(user => this.session.getUser())
    //    .subscribe(result => this.user = result);
  }

  errorCb(err) {
    this.error = err;
    this.user = null;
  }

  successCb(user) {
  this.user = user;
  // this.session.checkLogged(user);
  this.error = null;
  }

}
