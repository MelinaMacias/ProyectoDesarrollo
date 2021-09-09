
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MensajeContacto } from '../../models/MensajeContacto';

@Injectable({
  providedIn: 'root'
})
export class ContactFormService {

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

  getMensajes() {

    return this.http.get<Array<MensajeContacto>>(`${environment.main_url}/contacto/`);

  }

  createMessage(body:MensajeContacto) {
    return this.http.post<Object>(`${environment.main_url}/contacto/create`, body);
  }

  getMensaje(idMensaje: string){
    return this.http.get<MensajeContacto>(`${environment.main_url}/contacto/${idMensaje}`);
  }

  updateMensaje(idMensaje: string, mensajeRespuesta :string){
    return this.http.put(`${environment.main_url}/contacto/update/${idMensaje}/`,{"contestado": "true", "mensaje": mensajeRespuesta},this.httpOptions)
  }

}
