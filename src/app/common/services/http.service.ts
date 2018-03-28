import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Config } from '../../common/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class HttpService {
  apiBaseURL = Config.API_SERVER_URL;

  constructor(public _http: HttpClient) {
  }

  public get(url, token): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type' , 'application/json');
    headers = headers.append('Api-Token', token);
    const options = {headers: headers};
    return this._http.get(url, options).map(response => response);
  }

  public post(url, params, token?): Observable<any> {
     let headers = new HttpHeaders().set('Content-Type' , 'application/json');
     if (!!token) {
         headers = headers.set('Api-Token', token);
     }
    const options = {headers: headers};
    const body = JSON.stringify(params);
    return this._http.post(url, body, {headers: headers}).map(response => response);
  }

  public delete(url, token): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type' , 'application/json');
    headers = headers.append('Api-Token', token);
    const options = {headers: headers};

    return this._http.delete(url, options).map(response => response);
  }

}
