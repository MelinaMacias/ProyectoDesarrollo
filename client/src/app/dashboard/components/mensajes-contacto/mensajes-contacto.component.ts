
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajeContacto } from 'src/app/core/models/MensajeContacto';
import { ContactFormService } from 'src/app/core/services/contacto/contact-form.service';
import { NotificacionesService } from 'src/app/shared/services/notificaciones/notificaciones.service';

@Component({
  selector: 'app-mensajes-contacto',
  templateUrl: './mensajes-contacto.component.html',
  styleUrls: ['./mensajes-contacto.component.css']
})
export class MensajesContactoComponent implements OnInit {

  mensajes: Array<MensajeContacto> = [];

  constructor(private contactoService: ContactFormService,
    private route: ActivatedRoute,
    private router: Router,
    private notifaciones: NotificacionesService) { }

  ngOnInit(): void {

    this.contactoService.getMensajes().subscribe( (mensajes) => {

      mensajes.forEach( (mensaje: MensajeContacto) => {
      
        this.mensajes.push(mensaje);
      
      });

    });

  }

  

}
