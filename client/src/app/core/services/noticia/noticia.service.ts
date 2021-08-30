
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Noticia } from '../../models/noticia';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  constructor(
    private http: HttpClient) {

  }

  getAllNews() {

    return this.http.get<Noticia[]>(`${environment.main_url}/noticias`);

  }

}
