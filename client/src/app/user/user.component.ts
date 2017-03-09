import { Component, OnInit } from '@angular/core';
import { UserSessionService } from "../user-session.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: any;
  formInfo = {
    username: '',
    password: ''
  };
  error: string;
  privateData: any = '';

  constructor(private session: UserSessionService) { }

  ngOnInit() {
    this.session.isLoggedIn()
      .subscribe(
        (user) => this.successCb(user)
      );
  }

  login() {
    this.session.login(this.formInfo)
      .subscribe(
        (user) => this.successCb(user),
        (err) => this.errorCb(err)
      );
  }

  signup() {
    this.session.signup(this.formInfo)
      .subscribe(
        (user) => this.successCb(user),
        (err) => this.errorCb(err)
      );
  }

  logout() {
    this.session.logout()
      .subscribe(
        () => this.successCb(null),
        (err) => this.errorCb(err)
      );
  }

  getPrivateData() {
    this.session.getPrivateData()
      .subscribe(
        (data) => this.privateData = data,
        (err) => this.error = err
      );
  }

  errorCb(err) {
    this.error = err;
    this.user = null;
  }

  successCb(user) {
    this.user = user;
    this.error = null;
  }
}
