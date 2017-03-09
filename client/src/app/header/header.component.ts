import { Component, OnInit } from '@angular/core';
import { UserSessionService } from "../user-session.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [UserSessionService]
})
export class HeaderComponent implements OnInit {

  constructor(private user : UserSessionService) { }

  ngOnInit() {
  //   this.user.login(this.user)
  // .subscribe((user) => {
  //   this.user});
  }

}
