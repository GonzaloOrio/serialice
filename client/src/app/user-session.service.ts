import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment} from '../environments/environment';

const baseURL = environment.apiUrl

@Injectable()
export class UserSessionService {

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
    return this.http.get(`${baseURL}/loggedin`, {withCredentials:true})
      .map(res => res.json())
      .catch((err) => this.handleError(err));
  }
}
