import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Reserva } from '../../models/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  private httpOptions: any;
  
  constructor(private http: HttpClient) { 
    this.httpOptions = {
      headers: new HttpHeaders({
        "Authorization": `JWT ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      })
    };
  }

  getReservas() {
    return this.http.get<Reserva[]>(`${environment.main_url}/reservas/`)
  }

  getReserva(idReserva: number){
  
    return this.http.get<Reserva>(`${environment.main_url}/reservas/${idReserva}`);
  
  }

  createReserva(reserva: Reserva) {
    return this.http.post(`${environment.main_url}/reservas/`, reserva, this.httpOptions)
  }

  borrarReserva(id: number) {
    return this.http.delete(`${environment.main_url}/reservas/${id}`, this.httpOptions)
  }

  actualizarReserva(idReserva: number, reserva: Reserva){

    return this.http.put(`${environment.main_url}/reservas/${idReserva}/`, reserva, this.httpOptions)
  
  }
}
