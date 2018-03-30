/* Aqui se consumira el endpoint del app REST */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Project } from '../models/project.model';
import { AuthenticationService } from '../../../common/services/authentication.service';
import { HttpService } from '../../../common/services/http.service';
import { Token } from '@angular/compiler';

@Injectable()
export class ProjectListService extends HttpService {
  constructor(public _http: HttpClient, public _authService: AuthenticationService) {
    super(_http);
  }
  getAll(): Observable<Array<Project>> {
    // Usar preflight request para el manejo de CORS
    const url = `${this.apiBaseURL}/projects`;
    const token = this._authService.user.api_token;
    return this.get(url, token);
    /* Operaciones de observables
      next()
      error()
      onFinished()
    */
  }

  deleteProject(project: Project):  Observable<Array<Project>> {
    const url = `${this.apiBaseURL}/projects/${project.id}`;
    const token = this._authService.user.api_token;
    return this.delete(url, token);
  }
}
