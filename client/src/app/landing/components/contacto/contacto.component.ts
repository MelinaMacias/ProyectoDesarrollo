
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ContactFormService } from 'src/app/core/services/contacto/contact-form.service';
import { NotificacionesService } from 'src/app/shared/services/notificaciones/notificaciones.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  asuntoField: FormControl
  nameField: FormControl
  emailField: FormControl
  celularField: FormControl
  messageField: FormControl

  constructor(
    private contactFormService:ContactFormService,
    private notificacionService: NotificacionesService) {

    this.asuntoField = new FormControl('')
    this.nameField = new FormControl('', [Validators.required, Validators.minLength(10)]);
    this.emailField = new FormControl('', [Validators.required, Validators.email]);
    this.celularField = new FormControl('', [Validators.required], );
    this.messageField = new FormControl('', [Validators.required]);

  }

  ngOnInit(): void {

  }

  public sendMessage(event:any) {

    event.preventDefault();

    this.contactFormService.createMessage({
      "id": "",
      "asunto": this.asuntoField.value,
      "nombre": this.nameField.value,
      "email": this.emailField.value,
      "celular": this.celularField.value,
      "mensaje": this.messageField.value,
      "fecha_creacion": "",
      "contestado": false,

    }).subscribe( response => {

      this.asuntoField.setValue(""),
      this.nameField.setValue(""),
      this.celularField.setValue(""),
      this.emailField.setValue(""),
      this.messageField.setValue(""),
      this.notificacionService.notificacionExitosa("Mensaje enviado exitosamente!")
      
    },
      (err) => this.notificacionService.notificacionErrores(err)
    )

  }

}
