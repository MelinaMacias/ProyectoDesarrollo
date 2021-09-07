import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(
    private http: HttpClient
  ) { }

  getEstadisticas(){
    return this.http.get<any>(`${environment.main_url}/estadisticas/`)
  }

}

