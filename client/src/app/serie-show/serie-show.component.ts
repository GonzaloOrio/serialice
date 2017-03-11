import { Component, OnInit } from '@angular/core';
import { SeriesService } from "../series.service";
import {Router, ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-serie-show',
  templateUrl: './serie-show.component.html',
  styleUrls: ['./serie-show.component.css']
})
export class SerieShowComponent implements OnInit {
  private similarSeries: Array<Object> = [];
  private serie: any = {};

  constructor(
    private seriesService: SeriesService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .switchMap(id => this.seriesService.getSerieDetails(id))
      .subscribe(result => this.serie = result);

    // this.route.params
    //   .map(params => params['id'])
    //   .switchMap(id => this.seriesService.getSerieSeasonDetails(id))
    //   .subscribe(result => this.serie = result);

    this.route.params
      .map(params => params['id'])
      .switchMap(id => this.seriesService.getSimilarSeries(id))
      .subscribe(response => this.similarSeries = response.results);

    this.route.params
      .map(params => params['id'])
      .subscribe(() => {this.seriesService.setSharedSearchResult([]); window.scrollTo(0,0);});

    this.seriesService.setSharedSearchResult([]);
  }

}
