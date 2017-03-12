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
  // upComingSeries: Array<Object>;
  nowPlayingSeries: Array<Object>;
  searchQuery: string;
  autocompleteSeries: Array<Object> = [];

  constructor(private seriesService: SeriesService) {}

  ngOnInit() {

    this.seriesService.getPopularSeries()
        .subscribe(
          response => {
            console.log('PopularSeries')
            console.log(response.results)
            this.popularSeries = response.results;
          });

      this.seriesService.getTopRatedSeries()
        .subscribe(
          response => {
            console.log('TopRatedSeries')
            console.log(response.results)
            this.topRatedSeries = response.results;
          });

      // this.seriesService.getUpComingSeries()
      //   .subscribe(
      //     response => {
      //       console.log('UpComingSeries')
      //       console.log(response.results)
      //       this.upComingSeries = response.results;
      //     })
      //
      this.seriesService.getNowPlayingSeries()
        .subscribe(
          response => {
            console.log('NowPlayingSeries')
            console.log(response.results)
            this.nowPlayingSeries = response.results;
          })

      this.seriesService.setSharedSearchResult([]);
    }

    searchSeries() {
      this.seriesService.searchSeries(this.searchQuery)
        .subscribe(response => {
          this.seriesService.setSharedSearchResult(response.results);
        })
    }

    autocompleteSearchSeries() {
      if (this.searchQuery.length > 2) {
        this.seriesService.searchSeries(this.searchQuery)
          .subscribe(response => {
            this.autocompleteSeries = response.results;
          })
      } else {
        this.autocompleteSeries = [];
      }
    }

    select(serie) {
      this.searchQuery = serie;
      this.autocompleteSeries = [];
    }
  }
