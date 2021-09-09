import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReservasService } from 'src/app/core/services/reservas/reservas.service';
import { NotificacionesService } from 'src/app/shared/services/notificaciones/notificaciones.service';

@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.component.html',
  styleUrls: ['./reservaciones.component.css']
})
export class ReservacionesComponent implements OnInit {

  formInvalid: boolean;
  detalleField: FormControl;
  numeroAsientosField: FormControl;
  fechaField: FormControl;
  reserva: any;

  constructor(
    private reservaService: ReservasService,
    private notificacionesService: NotificacionesService,
    private router: Router
  ) {

    this.detalleField = new FormControl('', [Validators.required, Validators.minLength(4)]);
    this.numeroAsientosField = new FormControl('', [Validators.required, Validators.minLength(1)]);
    this.fechaField = new FormControl('', [Validators.required]);

  }

  ngOnInit(): void {

  }



  crearReservacion(){
    this.reservaService.createReserva({
      id: 0,
      detalle: this.detalleField.value,
      numeroAsientos: this.numeroAsientosField.value,
      fechaReserva: this.fechaField.value,
    
    }).subscribe((reserva: any) => {
      this.notificacionesService.notificacionExitosa(
        `La reserva ${reserva.detalle} fue creada de forma exitosa `);
      this.router.navigate(["/dashboard/reservas"])
    },
    (err) => this.notificacionesService.notificacionErrores(err)
    );
  }

}
