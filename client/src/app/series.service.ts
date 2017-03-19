import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { environment} from '../environments/environment';

const baseURL = environment.apiUrl

@Injectable()
export class SeriesService {
  private apikey: string = '15e2ef2c6a55de911f80c81d7448459a';
  private baseUrl: string = 'https://api.themoviedb.org/3/';
  private serie: string = 'tv/'
  private sortByPopularity: string = '&sort_by=popularity.desc';
  private sharedSearchResult: Array<Object> = [];

  constructor(private http: Http) { }

  //API TMDB Functions

  public getSharedSearchResult() {
    return this.sharedSearchResult;
  }

  public setSharedSearchResult(searchResult) {
    this.sharedSearchResult = searchResult;
  }

  public getPopularSeries() {
    return this.http.get(this.baseUrl + this.serie + 'popular?api_key=' + this.apikey)
      .map(result => result.json())
      .catch(this.handleError);
  }

  public getTopRatedSeries() {
    return this.http.get(this.baseUrl + this.serie + 'top_rated?api_key=' + this.apikey)
      .map(result => result.json())
      .catch(this.handleError);
  }

  public getNowPlayingSeries() {
    return this.http.get(this.baseUrl + this.serie + 'on_the_air?api_key=' + this.apikey)
      .map(result => result.json())
      .catch(this.handleError);
  }

  public searchSeries(query) {
    return this.http.get(this.baseUrl + 'search/tv?api_key='+ this.apikey + '&query=' + query + this.sortByPopularity)
      .map(result => result.json())
      .catch(this.handleError);
  }

  public getSerieDetails(id) {
    return this.http.get(this.baseUrl + this.serie + id + '?api_key='+this.apikey)
      .map(result => result.json())
      .catch(this.handleError);
  }

  // public getSerieSeasonDetails(id,season) {
  //   return this.http.get(this.baseUrl + this.serie + id + '/season/'+ season + '?api_key=' +this.apikey)
  //     .map(result => result.json())
  // }

  public getSimilarSeries(id) {
    return this.http.get(this.baseUrl + this.serie +  id + '/similar?api_key=' + this.apikey)
      .map(result => result.json())
      .catch(this.handleError);
  }

  public getSerieReviews(id) {
    return this.http.get(this.baseUrl + this.serie + id + '/reviews?api_key=' + this.apikey)
      .map(result => result.json())
      .catch(this.handleError);
  }

  public sharedSearchSeries(searchQuery) {
    this.searchSeries(searchQuery)
      .subscribe(response =>{
        this.sharedSearchResult = response.results;
      })
  }

  public handleError(e){
    return Observable.throw(e.json().message);
  }

  //DataBase Functions

  public addToList(userId,serieId){
    return this.http.post(`${baseURL}/list`, {data:{userId:userId,serieId:serieId}})
      .map(res => res.json())
      .catch(this.handleError);
  }

  public getList(userId){
    return this.http.get(`${baseURL}/list/${userId}`)
      .map((result) => result.json())
      .catch(this.handleError);
  }

  public isSerieSaw(serie){
    return this.http.put(`${baseURL}/list/${serie.databaseID}`,serie)
      .map((res) => res.json())
      .catch((err) => Observable.throw(err.json()));
  }

  public deleteMySerie(databaseID){
    return this.http.delete(`${baseURL}/list/${databaseID}`)
      .map((res) => res.json())
      .catch((err) => Observable.throw(err.json()));
  }
}
