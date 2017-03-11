import { Component, OnInit } from '@angular/core';
import { UserSessionService } from "../user-session.service";
import { Router } from '@angular/router';
// import { ModalModule } from "ngx-modal";

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
  // privateData: any = '';

  constructor(private session: UserSessionService, private router: Router) { }

  ngOnInit() {}

  login() {
    this.session.login(this.formInfo)
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
