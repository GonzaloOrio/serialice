import { Component, OnInit } from '@angular/core';
import { SeriesService } from "../series.service";
import { UserSessionService } from "../user-session.service";
import {Router, ActivatedRoute} from '@angular/router'
import { LoggedinService } from '../loggedin.service';
import { Observable } from 'rxjs/Rx';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserSessionService, SeriesService]
})
export class ProfileComponent implements OnInit {
  private user: any;
  private seriesList: any;
  private options: any;
  private error: string;
  private serie: any;

  constructor(private session : UserSessionService, private seriesService: SeriesService, private router: Router, private route: ActivatedRoute, private loggedin: LoggedinService) {
    this.user = loggedin.getUser();
  }

  ngOnInit() {
    this.session.isLoggedIn()
    .flatMap((user) => {
      this.user = user;
      return this.seriesService.getList(user._id)
    })
    .map((list) => list.map((o) => {console.log("objeto recibido: " + o.isView); this.options = o ; return o.serieId}))
    .flatMap((idList)=> Observable.forkJoin(idList.map((id) => this.seriesService.getSerieDetails(id))))
    .subscribe((seriesListProcessed) => {
      console.log(seriesListProcessed);
      this.seriesList = seriesListProcessed;
    });

    // this.session.isLoggedIn()
    // .flatMap((user) => {
    //   this.user = user;
    //   return this.seriesService.getList(user._id)
    // })
    // .map((list) => list.map((o) => o.serieId))
    // .flatMap((idList)=> Observable.forkJoin(idList.map((id) => this.seriesService.getSerieDetails(id))))
    // .subscribe((seriesListProcessed) => {
    //   console.log(seriesListProcessed);
    //   this.seriesList = seriesListProcessed;
    // });


    /*this.seriesService.getList
      .subscribe((list) => {
        console.log(list);
        this.list = list;
        //this.showSeries();
      });*/
  }

  deleteToMyList(serieId,userId) {
    this.seriesService.deleteMySerie(serieId,userId)
      .subscribe(
        (serie) => this.successCb(serie),
        (err) => this.errorCb(err)
      );
  }

  errorCb(err) {
    this.error = err;
    this.serie = null;
  }

  successCb(serie) {
    this.serie = serie;
    this.error = null;
    this.router.navigate(['profile']);

    // this.router.navigate(['home']);
  }

  /*showSeries(){
    for(let i = 0; i < this.list.length;i++){
      return this.seriesService.getSerieDetails(this.list[i].serieId)
         .subscribe(result => this.seriesList = result)
    };
  }*/

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


}
