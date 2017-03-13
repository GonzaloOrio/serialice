import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit, Input, EventEmitter } from '@angular/core';

const baseURL = "http://localhost:3000"
// const baseURL = ""

@Injectable()
export class SeriesService {
  private apikey: string = 'api_key=15e2ef2c6a55de911f80c81d7448459a';
  private baseUrl: string = 'https://api.themoviedb.org/3/';
  private serie: string = 'tv/'
  // private listInfo = {
  //   userId: '',
  //   serieId: ''
  // };
  private sortByPopularity = '&sort_by=popularity.desc';
  private sharedSearchResult: Array<Object> = [];

  constructor(private http: Http) { }

  public getSharedSearchResult() {
    return this.sharedSearchResult;
  }

  public setSharedSearchResult(searchResult) {
    this.sharedSearchResult = searchResult;
  }

  public getPopularSeries() {
    return this.http.get(this.baseUrl + this.serie + 'popular?' + this.apikey)
      .map(result => result.json())
  }

  public getTopRatedSeries() {
    return this.http.get(this.baseUrl + this.serie + 'top_rated?' + this.apikey)
      .map(result => result.json())
  }

  public getNowPlayingSeries() {
    return this.http.get(this.baseUrl + this.serie + 'on_the_air?' + this.apikey)
      .map(result => result.json())
  }

  public searchSeries(query) {
    return this.http.get(this.baseUrl + 'search/tv?'+ this.apikey + '&query=' + query + this.sortByPopularity)
      .map(result => result.json())
  }

  public getSerieDetails(id) {
    return this.http.get(this.baseUrl + this.serie + id + '?'+this.apikey)
      .map(result => result.json())
  }

  // public getSerieSeasonDetails(id,season) {
  //   return this.http.get(this.baseUrl + this.serie + id + '/season/' + season + '?'+this.apikey)
  //     .map(result => result.json())
  // }

  public getSimilarSeries(id) {
    return this.http.get(this.baseUrl + this.serie +  id + '/similar?' + this.apikey)
      .map(result => result.json())
  }

  public getSerieReviews(id) {
    return this.http.get(this.baseUrl + this.serie + id + '/reviews?' + this.apikey)
      .map(result => result.json())
  }

  public sharedSearchSeries(searchQuery) {
    this.searchSeries(searchQuery)
      .subscribe(response => {
        this.sharedSearchResult = response.results;
      })
  }

  //Send to DB

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  addToList(userId,serieId) {
    return this.http.post(`${baseURL}/list`, {data:{userId:userId,serieId:serieId}})
      .map(res => res.json())
      .catch(this.handleError);
  }
}
