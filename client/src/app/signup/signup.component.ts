import { Component, OnInit } from '@angular/core';
import { UserSessionService } from "../user-session.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [ UserSessionService ]
})
export class SignupComponent implements OnInit {
  user: any;
  formInfo = {
    username: '',
    password: ''
  };
  error: string;
  // privateData: any = '';

  constructor(private session: UserSessionService, private router: Router) { }

  ngOnInit() {
    // this.session.isLoggedIn()
    //   .subscribe(
    //     (user) => this.successCb(user)
    //   );
  }

  signup() {
    this.session.signup(this.formInfo)
      .subscribe(
        (user) => this.successCb(user),
        (err) => this.errorCb(err)
      );
  }

  // getPrivateData() {
  //   this.session.getPrivateData()
  //     .subscribe(
  //       (data) => this.privateData = data,
  //       (err) => this.error = err
  //     );
  // }

  errorCb(err) {
    this.error = err;
    this.user = null;
  }

  successCb(user) {
    this.user = user;
    this.session.checkLogged(user);
    this.error = null;
    this.router.navigate(['home']);
  }
}
