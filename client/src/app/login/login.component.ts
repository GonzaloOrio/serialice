import { Component, OnInit } from '@angular/core';
import { UserSessionService } from "../user-session.service";
import { Router } from '@angular/router';
import { LoggedinService } from '../loggedin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ UserSessionService ]
})
export class LoginComponent implements OnInit {
  user: any;
  formInfo = {
    username: '',
    password: ''
  };
  error: string;

  constructor(private session: UserSessionService, private router: Router, private loggedin: LoggedinService) { }

  ngOnInit() {}

  login() {
    this.session.login(this.formInfo)
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
    this.loggedin.checkLogged(user);
    this.error = null;
    this.router.navigate(['home']);
  }
  }
