
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Menu } from '../../models/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private httpOptions: any;

  constructor(
    private http: HttpClient
    ) {

    this.httpOptions = {
      headers: new HttpHeaders({
        "Authorization": `JWT ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      })
    };

  }

  getAllPlates() {
    return this.http.get<Menu[]>(`${environment.main_url}/platos`);
  }

  getPlato(idPlato: number){

    return this.http.get<Menu>(`${environment.main_url}/platos/${idPlato}`);

  }

  actualizarPlato(idPlato: number, menu: Menu){

    return this.http.put(`${environment.main_url}/platos/${idPlato}/`, menu, this.httpOptions)

  }

  crearPlato(menu: Menu){
    return this.http.post(`${environment.main_url}/platos/`, menu, this.httpOptions)
  }

  borrarPlato(idPlato: number){

    return this.http.delete(`${environment.main_url}/platos/${idPlato}`, this.httpOptions)

  }

}
