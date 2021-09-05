
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Noticia } from '../../models/noticia';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  private httpOptions: any;

  constructor(
    private http: HttpClient) {
      this.httpOptions = {
        headers: new HttpHeaders({
          "Authorization": `JWT ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        })
      };
  }

  getAllNews() {

    return this.http.get<Noticia[]>(`${environment.main_url}/noticias`);

  }

  getNoticia(idNoticia: number){
  
    return this.http.get<Noticia>(`${environment.main_url}/noticias/${idNoticia}`);
  
  }

  actualizarNoticia(idNoticia: number, noticia: Noticia){

    return this.http.put(`${environment.main_url}/noticias/${idNoticia}/`, noticia, this.httpOptions)
  
  }

  crearNoticia(noticia: Noticia){
    return this.http.post(`${environment.main_url}/noticias/`, noticia, this.httpOptions)
  }
  
  borrarNoticia(idNoticia: number){

    return this.http.delete(`${environment.main_url}/noticias/${idNoticia}`, this.httpOptions)

  }

}
