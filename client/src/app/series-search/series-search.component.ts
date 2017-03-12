import { Component, OnInit } from '@angular/core';
import { SeriesService } from "../series.service";

@Component({
  selector: 'app-series-search',
  templateUrl: './series-search.component.html',
  styleUrls: ['./series-search.component.css']
})
export class SeriesSearchComponent implements OnInit {

  constructor(private seriesService: SeriesService) { }

  ngOnInit() {
  }

  public removeSearchResults() {
    this.seriesService.setSharedSearchResult([]);
  }

}
