import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserva } from 'src/app/core/models/reserva';
import { ReservasService } from 'src/app/core/services/reservas/reservas.service';
import { NotificacionesService } from 'src/app/shared/services/notificaciones/notificaciones.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {

  reservas : Array<Reserva> = [];

  constructor(private reservasService: ReservasService,
    private route: ActivatedRoute,
    private router: Router,
    private notifaciones: NotificacionesService) { }

  ngOnInit(): void {

    this.reservasService.getReservas().subscribe( (reservas: Array<Reserva>) => {

      reservas.forEach( (reserva: any) => {
      
        this.reservas.push(reserva);
      
      });

      });

  }

  borrar(reserva: Reserva){
  
    this.reservasService.borrarReserva(reserva.id).subscribe( (reserva: any) => {

      document.querySelector(`#reserva-${reserva.id}`).remove();
      this.notifaciones.notificacionExitosa(
        `La reserva ${reserva.detalle} fue borrado de forma exitosa `);
          
    });
  
  }

}
