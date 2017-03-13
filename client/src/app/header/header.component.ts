import { Component, OnInit } from '@angular/core';
import { UserSessionService } from "../user-session.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [UserSessionService]
})
export class HeaderComponent implements OnInit {
  user: any;
  error: string;
  constructor(private session : UserSessionService, private router: Router) {
    session.getEmitter().subscribe((user) => {this.user = user});
  }

  ngOnInit() {
    this.session.isLoggedIn()
     .subscribe(
       (user) => this.successCb(user)
     );
  }

  logout() {
    this.session.logout()
      .subscribe(
        (user) => this.successCb(user),
        (err) => this.errorCb(err)
      );
  }

  errorCb(err) {
    this.error = err;
    this.user = null;
  }

  successCb(user) {
  this.user = user;
  // this.session.checkLogged(user);
  this.error = null;
  this.router.navigate(['']);
  }


}
