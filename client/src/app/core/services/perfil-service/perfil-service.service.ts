
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  PATH: string = "/perfiles"
  httpOptions: any;

  constructor(
    private http: HttpClient ) {

    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": `JWT ${localStorage.getItem("token")}`
      })
    };

  }

  getPerfiles() {

    return this.http.get(`${environment.main_url + this.PATH}/`);

  }

  getPerfil(id: number) {

    return this.http.get(`${environment.main_url + this.PATH}/${id}/`, this.httpOptions);

  }

  crearPerfil(perfil: any) {

    return this.http.post(`${environment.main_url + this.PATH}/`, perfil, this.httpOptions);

  }

  updatePerfil(id: number, perfil: any) {

    return this.http.put(`${environment.main_url + this.PATH}/${id}/`, perfil, this.httpOptions);

  }

  deletePerfil(id: number) {

    return this.http.delete(`${environment.main_url + this.PATH}/${id}/`, this.httpOptions);

  }

}
