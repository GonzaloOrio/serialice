import { Component, OnInit } from '@angular/core';
import { SeriesService } from "../series.service";
import { UserSessionService } from "../user-session.service";
import { LoggedinService } from '../loggedin.service';
import {Router, ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-serie-show',
  templateUrl: './serie-show.component.html',
  styleUrls: ['./serie-show.component.css'],
  providers: [UserSessionService]
})
export class SerieShowComponent implements OnInit {
  private similarSeries: Array<Object> = [];
  private serie: any = {};
  private serieSeason: any = [];
  private user: any = {};
  // private season: any = {};
  private list: any;
  private error: string;

  constructor(
    private seriesService: SeriesService,
    private sessionService: UserSessionService,
    private route: ActivatedRoute,
    private router: Router,
    private loggedin: LoggedinService) {
        // this.user = loggedin.getUser();
    }

  ngOnInit() {
    this.sessionService.isLoggedIn()
     .subscribe(
       (user) => this.successCb(user),
       (err) => this.errorCb(err)
     );

    this.route.params
      .map(params => params['id'])
      .switchMap(id => this.seriesService.getSerieDetails(id))
      .subscribe(result => this.serie = result);

    // this.route.params
    //   .map(params => params['id'])
    //   .switchMap((id,season) => this.seriesService.getSerieSeasonDetails(id,season))
    //   .subscribe(result => this.serieSeason = result);

    this.route.params
      .map(params => params['id'])
      .switchMap(id => this.seriesService.getSimilarSeries(id))
      .subscribe(response => this.similarSeries = response.results);

    this.route.params
      .map(params => params['id'])
      .subscribe(() => {this.seriesService.setSharedSearchResult([]); window.scrollTo(0,0);});

    this.seriesService.setSharedSearchResult([]);
  }

  addToMyList() {
    this.seriesService.addToList(this.user._id,this.serie.id)
      .subscribe(
        (list) => this.successAddCb(list),
        (err) => this.errorAddCb(err)
      );
  }

  errorCb(err) {
    this.error = err;
    this.list = null;
  }

  successCb(user) {
    this.user = user;
    this.error = null;
  }

  errorAddCb(err) {
    this.error = err;
    this.list = null;
    this.router.navigate(['']);
  }

  successAddCb(list) {
    this.list = list;
    this.error = null;
    this.router.navigate(['profile']);
  }
}
