import { Component, OnInit } from '@angular/core';
import { ProjectListService } from './services/project-list.service';
import { Project } from './models/project.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
/*
  1- Inyecto el servicio en el constructor, este suplira los datos
  2- genero una variable de tipo Proyect (modelo) que guardara los datos que arroja el servicio
  3- asigno la variable de tipo proyect (this.projects) al metodo de inyeccion (metodo get all)

*/
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  isLoading = true;
  projects: Array<Project>;

  constructor(private _projectListService: ProjectListService, private _http: HttpClient) { }

  ngOnInit() {
    this.getAllProjecs();
  }

  getAllProjecs() {
    this._projectListService.getAll().subscribe(
      (data: Project[]) => {
        // next
        console.log('data del observable', data);
        this.projects = data;
        console.log('Valor Loading', this.isLoading);
        this.isLoading = false;
      },
      err => {
        console.error('Error del servicio ', err);
      },
      () => {
        console.log('Finished');
      }
    );
  }

  /* Metodo que se ejecuta cada vez que se elimine un projecto (buenas practicas: hhacer esto desde un servicio) */
  onDeleteProject(project: Project) {
    this._projectListService.deleteProject(project).subscribe((data) => {
      console.log('Respuesta proyecto que acaba de eliminar ', data);
      this.getAllProjecs();
    });
  }

  public setData(sortedData) {
    console.log('sortedData: %o', sortedData);
    this.projects = sortedData;
  }


}
