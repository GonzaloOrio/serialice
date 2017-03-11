import { Component, OnInit } from '@angular/core';
import { UserSessionService } from "../user-session.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [UserSessionService]
})
export class HeaderComponent implements OnInit {
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
