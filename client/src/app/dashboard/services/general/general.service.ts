
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

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

  getEstadisticas(){
    return this.http.get<any>(`${environment.main_url}/estadisticas/`)
  }

  getEstadisticasStaff() {

    return this.http.get(`${environment.main_url}/estadisticas-staff/`, this.httpOptions);

  }

}
