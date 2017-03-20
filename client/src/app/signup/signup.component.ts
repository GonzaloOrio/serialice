import { Component, OnInit } from '@angular/core';
import { UserSessionService } from "../user-session.service";
import { Router } from '@angular/router';
import { LoggedinService } from '../loggedin.service';

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

  constructor(private session: UserSessionService, private router: Router, private loggedin: LoggedinService) { }

  ngOnInit() {}

  signup():void {
    this.session.signup(this.formInfo)
      .subscribe(
        (user:any) => this.successCb(user),
        (err:any) => this.errorCb(err)
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
    this.router.navigate(['home']);
  }
}
