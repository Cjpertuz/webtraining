/* Aqui se consumira el endpoint del app REST */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Project } from '../models/project.model';

@Injectable()
export class ProjectListService {
  constructor(private _http: HttpClient) {

  }
  getAll(): Observable<Array<Project>> {
    // Usar preflight request para el manejo de CORS
    const url = 'http://172.104.91.187/projects';
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this._http.get<Array<Project>>(url, {headers: headers}).map((response) => {
      console.log('Desde el servicio ', response);
      return response;
    });
    /* Operaciones de observables
      next()
      error()
      onFinished()
    */
  }

  deleteProject(project: Project):  Observable<Array<Project>> {
    const url = `http://172.104.91.187/projects/${project.id}`;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this._http.delete<Array<Project>>(url, {headers: headers}).map((response) => {
      console.log('Desde el componente - Metodo delete ', response);
      return response;
    });
  }
}
