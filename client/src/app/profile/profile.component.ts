import { Component, OnInit } from '@angular/core';
import { SeriesService } from "../series.service";
import { UserSessionService } from "../user-session.service";
import {Router, ActivatedRoute} from '@angular/router'
import { LoggedinService } from '../loggedin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserSessionService, SeriesService]
})
export class ProfileComponent implements OnInit {
  user: any;
  error: string;
  serie: any;
  list : any;
  constructor(private session : UserSessionService, private seriesService: SeriesService, private router: Router, private route: ActivatedRoute, private loggedin: LoggedinService) {
    this.user = loggedin.getUser();
  }

  ngOnInit() {
    this.session.isLoggedIn()
     .subscribe(
       (user) => this.successCb(user),
       (err) => this.errorCb(err)
     );

    this.seriesService.getList()
      .subscribe((list) => {
        this.list = list});

    setTimeout(()=> {this.seriesService.getSerieDetails(this.list.serieId)
      .subscribe(result => this.serie = result)},2000);

    // this.route.params
    //   .subscribe((params)=> {
    //     this.serieId = params['id'];
    //   });

    // this.route.params
    //   .map(params => params['id'])
    //   .switchMap(id => this.seriesService.getSerieDetails(id))
    //   .subscribe(result => this.serie = result);

    //  this.route.params
    //    .map(params => params['user'])
    //    .switchMap(user => this.session.getUser())
    //    .subscribe(result => this.user = result);
  }

  errorCb(err) {
    this.error = err;
    this.user = null;
  }

  successCb(user) {
  this.user = user;
  // this.session.checkLogged(user);
  this.error = null;
  }

}
