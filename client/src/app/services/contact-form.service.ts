
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MensajeContacto} from '../../models/MensajeContacto'

@Injectable({
  providedIn: 'root'
})
export class ContactFormService {

  constructor(
    private http: HttpClient) {

  }

  createMessage(body:MensajeContacto) {

    return this.http.post<Object>(`${environment.main_url}/mensajes`, body);

  }

}
