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

  user: any;
  seriesList: any;

  constructor(private session : UserSessionService, private seriesService: SeriesService, private router: Router, private route: ActivatedRoute, private loggedin: LoggedinService) {
    this.user = loggedin.getUser();
  }

  ngOnInit() {
    this.session.isLoggedIn()
    .flatMap((user) => {
      this.user = user;
      return this.seriesService.getList(user._id)
    })
    .map((list) => list.map((o) => o.serieId))
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
