import { Component } from '@angular/core';
import { UserSessionService } from "./user-session.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  user:any;

  constructor(private session : UserSessionService) {
  session.getEmitter().subscribe((user) => {this.user = user});
  } 
}
