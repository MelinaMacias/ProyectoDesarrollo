import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Reserva } from 'src/app/core/models/reserva';
import { ReservasService } from 'src/app/core/services/reservas/reservas.service';
import { NotificacionesService } from 'src/app/shared/services/notificaciones/notificaciones.service';

@Component({
  selector: 'app-update-reserva',
  templateUrl: './update-reserva.component.html',
  styleUrls: ['./update-reserva.component.css']
})
export class UpdateReservaComponent implements OnInit {

  detalleField: FormControl;
  numeroAsientosField: FormControl;
  fechaReservaField: FormControl;
  reserva: Reserva;

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private reservaService : ReservasService,
    private notifaciones: NotificacionesService
  ) { 

    this.detalleField = new FormControl('', [Validators.required, Validators.minLength(10)])
    this.numeroAsientosField = new FormControl('', [Validators.required, Validators.minLength(20)])
    this.fechaReservaField = new FormControl('', [Validators.required])

  }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {

      const id = params.id || null
      this.reservaService.getReserva(id)
        .subscribe((reserva : Reserva )=> {

          this.detalleField.setValue(reserva.detalle);
          this.numeroAsientosField.setValue(reserva.numeroAsientos);
          this.fechaReservaField.setValue(reserva.fechaReserva);
          this.reserva = reserva;
        });
  
      });

  }


  editarReserva(){
  
    this.reserva.detalle = this.detalleField.value;
    this.reserva.numeroAsientos=this.numeroAsientosField.value;
    this.reserva.fechaReserva = this.fechaReservaField.value;
    this.reservaService.actualizarReserva(this.reserva.id, this.reserva).subscribe((reserva: any) => {
      this.notifaciones.notificacionExitosa(
        `La reserva ${reserva.detalle} fue actualizado de forma exitosa `);
    });
  }

}
