import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PerfilService } from 'src/app/core/services/perfil-service/perfil-service.service';
import { NotificacionesService } from 'src/app/shared/services/notificaciones/notificaciones.service';

@Component({
  selector: 'app-creacion-cliente',
  templateUrl: './creacion-cliente.component.html',
  styleUrls: ['./creacion-cliente.component.css']
})
export class CreacionClienteComponent implements OnInit {

  formInvalid: boolean;
  nombreField: FormControl;
  usuarioField: FormControl;
  apellidoField: FormControl;
  correoField: FormControl;

  constructor(
    private perfilService: PerfilService,
    private notificacionesService: NotificacionesService,
    private router: Router
  ) {

    this.correoField = new FormControl('', [Validators.required, Validators.email]);
    this.nombreField = new FormControl('', [Validators.required, Validators.minLength(4)]);
    this.apellidoField = new FormControl('', [Validators.required, Validators.minLength(4)]);
    this.usuarioField = new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z][\\w_]{4,}$"
      )
    ]);

  }

  ngOnInit(): void {

  }

  crearCuenta(){

    if( this.nombreField.invalid || this.correoField.invalid
      || this.usuarioField.invalid ) {

      this.formInvalid = true;

    } else {

      let perfil = {
        "username": this.usuarioField.value,
        "first_name": this.nombreField.value,
        "last_name": this.apellidoField.value,
        "is_staff": false,
        "email": this.correoField.value,
        "is_active": true,
        "password": "cualquiercosa"
      }

      this.perfilService.crearPerfil(perfil).subscribe( (res: any) => {
          this.notificacionesService.notificacionExitosa("Se ha registrado con exito, cuando su cuenta se verifique recibirá un mensaje a su correo con la notificación");
          this.router.navigate(["/"])
        },
        (err) => {this.notificacionesService.notificacionErrores(err)}
      );

    }

  }

}