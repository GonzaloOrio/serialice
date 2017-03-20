import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { environment} from '../environments/environment';

const BASEURL = environment.apiUrl;
const apiKey = environment.apiTMDB;

@Injectable()
export class SeriesService {
  private apikey: string = apiKey;
  private baseUrl: string = 'https://api.themoviedb.org/3/';
  private serie: string = 'tv/'
  private sortByPopularity: string = '&sort_by=popularity.desc';
  private sharedSearchResult: Object[];

  constructor(private http: Http) { }

  //API TMDB Functions

  getSharedSearchResult(): Object[] {
    return this.sharedSearchResult;
  }

  setSharedSearchResult(searchResult:any):void {
    this.sharedSearchResult = searchResult;
  }

  getPopularSeries():Observable<any> {
    return this.http.get(`${this.baseUrl}${this.serie}popular?api_key=${this.apikey}`)
      .map(result => result.json())
      .catch(this.handleError);
  }

  getTopRatedSeries():Observable<any> {
    return this.http.get(`${this.baseUrl}${this.serie}top_rated?api_key=${this.apikey}`)
      .map(result => result.json())
      .catch(this.handleError);
  }

  getNowPlayingSeries():Observable<any> {
    return this.http.get(`${this.baseUrl}${this.serie}on_the_air?api_key=${this.apikey}`)
      .map(result => result.json())
      .catch(this.handleError);
  }

  searchSeries(query:any): Observable<any> {
    return this.http.get(`${this.baseUrl}search/tv?api_key=${this.apikey}&query=${query}${this.sortByPopularity}`)
      .map(result => result.json())
      .catch(this.handleError);
  }

  getSerieDetails(id:any): Observable<any> {
    return this.http.get(`${this.baseUrl}${this.serie}${id}?api_key=${this.apikey}`)
      .map(result => result.json())
      .catch(this.handleError);
  }

  getSimilarSeries(id:any): Observable<any> {
    return this.http.get(`${this.baseUrl}${this.serie}${id}/similar?api_key=${this.apikey}`)
      .map(result => result.json())
      .catch(this.handleError);
  }

  getSerieReviews(id:any): Observable<any> {
    return this.http.get(`${this.baseUrl}${this.serie}${id}/reviews?api_key=${this.apikey}`)
      .map(result => result.json())
      .catch(this.handleError);
  }

  sharedSearchSeries(searchQuery:any):void {
    this.searchSeries(searchQuery)
      .subscribe(response =>{
        this.sharedSearchResult = response.results;
      })
  }

  handleError(e:any){
    return Observable.throw(e.json().message);
  }

  //DataBase Functions

  addToList(userId:any,serieId:any): Observable<any>{
    return this.http.post(`${BASEURL}/list`, {data:{userId:userId,serieId:serieId}})
      .map(res => res.json())
      .catch(this.handleError);
  }

  getList(userId:any): Observable<any>{
    return this.http.get(`${BASEURL}/list/${userId}`)
      .map((result) => result.json())
      .catch(this.handleError);
  }

  isSerieSaw(serie:any): Observable<any>{
    return this.http.put(`${BASEURL}/list/${serie.databaseID}`,serie)
      .map((res) => res.json())
      .catch((err) => Observable.throw(err.json()));
  }

  deleteMySerie(databaseID:any): Observable<any>{
    return this.http.delete(`${BASEURL}/list/${databaseID}`)
      .map((res) => res.json())
      .catch((err) => Observable.throw(err.json()));
  }
}
