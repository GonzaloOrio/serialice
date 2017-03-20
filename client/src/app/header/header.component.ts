import { Component, OnInit } from '@angular/core';
import { UserSessionService } from "../user-session.service";
import { Router } from '@angular/router';
import { LoggedinService } from '../loggedin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [UserSessionService]
})

export class HeaderComponent implements OnInit {
  user: any;
  error: string;
  constructor(private session : UserSessionService, private router: Router, private loggedin: LoggedinService) {
    loggedin.getEmitter().subscribe((user) => {this.user = user});
  }

  ngOnInit() {
    this.session.isLoggedIn()
     .subscribe(
       (user) => this.successCb(user)
     );
  }

  logout():void {
    this.session.logout()
      .subscribe(
       () => this.logOutSucess(null),
       (err) => this.errorCb(err)
     );
  }

  errorCb(err:any):void {
    this.error = err;
    this.user = null;
  }

  successCb(user:any):void {
    this.user = user;
    this.loggedin.checkLogged(user);
    this.error = null;
  }

  logOutSucess(user:any):void {
    this.loggedin.checkLogged(null);
    this.router.navigate([''])
    this.user = null;
  }
}
