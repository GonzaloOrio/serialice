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
  serieId: string;
  userSerieId: string;
  isView: boolean;
  list: any;
  seriesList: any;
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
        this.list = list;
        this.serieId = list.serieId;
        // this.userSerieId = list.userId;
        // this.isView = list.isView;
        console.log(list, list[1].serieId);
        this.showSeries();
      });


    // setTimeout(()=> {this.seriesService.getSerieDetails(this.list.serieId)
    //   .subscribe(result => this.serie = result)},5000);

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

  showSeries(){
    for(let i = 0; i < this.list.length;i++){
      return this.seriesService.getSerieDetails(this.list[i].serieId)
         .subscribe(result => this.seriesList = result)
    };
    // this.list.forEach((serie)=>{
    //   this.seriesService.getSerieDetails(this.list.serieId)
    //      .subscribe(result => this.serie = result)
    // });
  }

  // showSeries(){
  //   for(let i = 0; i < this.list.length;i++){
  //     this.seriesUser.push(this.seriesService.getSerieDetails(this.list[i].serieId));
  //       //  .subscribe(result => this.seriesList = result)
  //   };
  //
  //   this.seriesUser.subscribe(result => this.seriesList = result)
  //   // this.list.forEach((serie)=>{
  //   //   this.seriesService.getSerieDetails(this.list.serieId)
  //   //      .subscribe(result => this.serie = result)
  //   // });
  // }

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
