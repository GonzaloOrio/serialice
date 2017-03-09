import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http'
import 'rxjs/Rx'

@Injectable()
export class SeriesService {
  private apikey = '&api_key=15e2ef2c6a55de911f80c81d7448459a';
  private baseUrl = 'https://api.themoviedb.org/3/';
  private serie = 'tv/'
  private sortByPopularity = '&sort_by=popularity.desc';
  private jsonpCallback = '?callback=JSONP_CALLBACK';
  private sharedSearchResult: Array<Object> = [];

  constructor(private jsonp: Jsonp) { }

  public getSharedSearchResult() {
    return this.sharedSearchResult;
  }

  public setSharedSearchResult(searchResult) {
    this.sharedSearchResult = searchResult;
  }

  public getPopularSeries() {
    return this.jsonp.get(this.baseUrl + this.serie + 'popular' + this.jsonpCallback + this.apikey)
      .map(result => result.json())
  }


  // public getTopRatedSeries() {
  //   return this.jsonp.get(this.baseUrl + this.serie + 'top_rated' + this.jsonpCallback + this.apikey)
  //     .map(result => result.json())
  // }

  // public getUpComingSeries() {
  //   return this.jsonp.get(this.baseUrl + this.serie + 'upcoming' + this.jsonpCallback + this.apikey)
  //     .map(result => result.json())
  // }

  // public getNowPlayingSeries() {
  //   return this.jsonp.get(this.baseUrl + this.serie + 'now_playing' + this.jsonpCallback + this.apikey)
  //     .map(result => result.json())
  // }

  public searchSeries(query) {
    return this.jsonp.get(this.baseUrl + 'search/tv' + this.jsonpCallback + '&query=' + query + this.sortByPopularity + this.apikey)
      .map(result => result.json())
  }

  public getSerieDetails(id) {
    return this.jsonp.get(this.baseUrl + this.serie + id + this.jsonpCallback + this.apikey)
      .map(result => result.json())
  }

  public getSimilarSeries(id) {
    return this.jsonp.get(this.baseUrl + this.serie +  id + '/similar' +this.jsonpCallback + this.apikey)
      .map(result => result.json())
  }

  public getSerieReviews(id) {
    return this.jsonp.get(this.baseUrl + this.serie + id + '/reviews' +this.jsonpCallback + this.apikey)
      .map(result => result.json())
  }

  public sharedSearchSeries(searchQuery) {
    this.searchSeries(searchQuery)
      .subscribe(response => {
        this.sharedSearchResult = response.results;
      })
  }

}
