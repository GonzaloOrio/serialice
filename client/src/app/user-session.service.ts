import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit, Input, EventEmitter } from '@angular/core';

const baseURL = "http://localhost:3000"
// const baseURL = ""


@Injectable()
export class UserSessionService {
  user:any;
  userLogged = new EventEmitter();
constructor(private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  signup(user) {
    return this.http.post(`${baseURL}/signup`, user,{withCredentials:true})
      .map(res => res.json())
      .catch(this.handleError);
  }

  login(user) {
    return this.http.post(`${baseURL}/login`, user,{withCredentials:true})
      .map(res => res.json())
      // .map(user => {this.emmiter.emit(user); return user})
      .catch(this.handleError);
  }

  logout() {
    return this.http.post(`${baseURL}/logout`,{}, {withCredentials:true})
      .map(res => res.json())
      .catch(this.handleError);
  }

  isLoggedIn() {
    return this.http.get(`${baseURL}/loggedin`,{withCredentials:true})
      .map(res => res.json())
      .catch((err) => this.handleError(err));
  }

  // getPrivateData() {
  //   return this.http.get(`${baseURL}/private`,{withCredentials:true})
  //     .map(res => res.json())
  //     .catch(this.handleError);
  // }

  getEmitter(){
    return this.userLogged;
  }

  userIsLoggedIn():boolean{
    return this.user != undefined ? true : false;
  }

  getUser(){
    return this.user;
  }

  checkLogged(user){
    this.user = user;
    this.userLogged.emit(user);
  }

  // errorCb(err) {
  //   this.error = err;
  //   this.user = null;
  // }
  //
  // successCb(user) {
  //   this.user = user;
  //   this.session.checkLogged(user);
  //   this.error = null;
  //   this.router.navigate(['home']);
  // }


}
