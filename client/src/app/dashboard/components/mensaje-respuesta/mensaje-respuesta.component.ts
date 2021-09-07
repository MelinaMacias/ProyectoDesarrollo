
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MensajeContacto } from 'src/app/core/models/MensajeContacto';
import { NotificacionesService } from 'src/app/shared/services/notificaciones/notificaciones.service';
import { ContactFormService } from 'src/app/core/services/contacto/contact-form.service';

@Component({
  selector: 'app-mensaje-respuesta',
  templateUrl: './mensaje-respuesta.component.html',
  styleUrls: ['./mensaje-respuesta.component.css']
})
export class MensajeRespuestaComponent implements OnInit {

  
  asuntoField: FormControl;
  nombreField: FormControl;
  mensajeField: FormControl;
  emailField: FormControl;
  celularField: FormControl;
  respuestaField: FormControl;
  mensaje: MensajeContacto;

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private mensajeService : ContactFormService,
    private notifaciones: NotificacionesService
  ) { 

    this.asuntoField = new FormControl('', [Validators.required, Validators.minLength(10)])
    this.nombreField = new FormControl('', [Validators.required, Validators.minLength(20)])
    this.mensajeField = new FormControl('', [Validators.required])
    this.emailField = new FormControl('', [Validators.required, Validators.email])
    this.celularField = new FormControl('', [Validators.required])
    this.respuestaField = new FormControl('', [Validators.required, Validators.minLength(20)])
    this.asuntoField.disable()
    this.nombreField.disable()
    this.mensajeField.disable()
    this.emailField.disable()
    this.celularField.disable()
  }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {

      const id = params.id || null
      this.mensajeService.getMensaje(id)
        .subscribe((mensaje : MensajeContacto )=> {

          this.asuntoField.setValue(mensaje.asunto);
          this.nombreField.setValue(mensaje.nombre);
          this.mensajeField.setValue(mensaje.mensaje);
          this.emailField.setValue(mensaje.email);
          this.celularField.setValue(mensaje.celular);
          this.mensaje = mensaje;
        });
  
      });

  }


  responderMensaje(){
    if(this.respuestaField.value != ""){
      this.mensajeService.updateMensaje(this.mensaje.id, this.respuestaField.value)
      .subscribe( 
        () => { 
          this.notifaciones.notificacionExitosa("Se ha enviado su respuesta exitosamente.")
          this.router.navigate(["/dashboard/mensajes-contacto/"])
        }
      )
    }
  }

}
