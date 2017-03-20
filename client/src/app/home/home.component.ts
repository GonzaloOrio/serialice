import { Component, OnInit } from '@angular/core';
import { SeriesService } from "../series.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularSeries: Array<Object>;
  topRatedSeries: Array<Object>;
  nowPlayingSeries: Array<Object>;
  searchQuery: string;
  autocompleteSeries: Array<Object> = [];

  constructor(private seriesService: SeriesService) {}

  ngOnInit() {

    this.seriesService.getPopularSeries()
      .subscribe(
        response => {
          this.popularSeries = response.results;
        });

    this.seriesService.getTopRatedSeries()
      .subscribe(
        response => {
          this.topRatedSeries = response.results;
        });

    this.seriesService.getNowPlayingSeries()
      .subscribe(
        response => {
          this.nowPlayingSeries = response.results;
        })

    this.seriesService.setSharedSearchResult([]);
  }

  searchSeries():void {
    this.seriesService.searchSeries(this.searchQuery)
      .subscribe(response => {
        this.seriesService.setSharedSearchResult(response.results);
      })
  }

  autocompleteSearchSeries():void {
    if (this.searchQuery.length > 2) {
      this.seriesService.searchSeries(this.searchQuery)
        .subscribe(response => {
          this.autocompleteSeries = response.results;
        })
    } else {
      this.autocompleteSeries = [];
    }
  }

  select(serie:any):void {
    this.searchQuery = serie;
    this.autocompleteSeries = [];
  }
}
