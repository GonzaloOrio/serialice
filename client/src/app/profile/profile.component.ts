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
  private seriesSavedDB: any;
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
    .map((list) => {
      this.seriesSavedDB = list;
      return list.map((o) => {return o.serieId})
    })
    .flatMap((idList)=> Observable.forkJoin(idList.map((id) => this.seriesService.getSerieDetails(id))))
    .subscribe((seriesListProcessed) => {
      // console.log(seriesListProcessed);
      seriesListProcessed.map((serie:any) => {
        var match = this.seriesSavedDB.find((serieDB) => parseInt(serieDB.serieId) == serie.id);
        if(match != undefined){
          // Add database attributes to serie from external provider
          serie.isView = match.isView;
          serie.databaseID = match._id;
        }
        return serie;
      })

      this.seriesList = seriesListProcessed;
    });
  }

  addToMyList(databaseID){
    console.log(`Adding to database: ${databaseID}`);
  }

  deleteToMyList(databaseID) {
    console.log(`Deleting to database: ${databaseID}`);
    console.log(databaseID);
    this.seriesService.deleteMySerie(databaseID)
      .subscribe(
        response => {
          var index = this.seriesList.findIndex((serie) => serie.databaseID == databaseID);
          this.seriesList.splice(index,1);
        },
        (err) => this.errorCb(err)
      );
  }

  errorCb(err) {
    this.error = err;
  }
}
