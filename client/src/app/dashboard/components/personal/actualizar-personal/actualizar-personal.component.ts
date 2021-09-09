
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PerfilService } from 'src/app/core/services/perfil-service/perfil-service.service';
import { NotificacionesService } from 'src/app/shared/services/notificaciones/notificaciones.service';

@Component({
  selector: 'app-actualizar-personal',
  templateUrl: './actualizar-personal.component.html',
  styleUrls: ['./actualizar-personal.component.css']
})
export class ActualizarPersonalComponent implements OnInit {

  cuenta: any;
  usernameField = new FormControl('', [Validators.required]);
  emailField = new FormControl('', [Validators.required]);
  nombreField = new FormControl('', [Validators.required]);
  apellidoField = new FormControl('', [Validators.required]);
  isActiveField = new FormControl('');
  passwordField = new FormControl('', [Validators.required, Validators.minLength(4)]);

  constructor(
    private router: ActivatedRoute,
    private notificacionService: NotificacionesService,
    private perfilService: PerfilService) { }

  ngOnInit(): void {

    this.router.params.subscribe( (params: any) => {
      this.perfilService.getPerfil(params.id).subscribe( (cuenta: any) => {

        this.cuenta = cuenta
        this.usernameField.disable();
        this.usernameField.setValue(cuenta.username);
        this.nombreField.setValue(cuenta.first_name);
        this.apellidoField.setValue(cuenta.last_name);
        this.emailField.setValue(cuenta.email);
        this.isActiveField.setValue(cuenta.is_active);

      });

    });

  }

  actualizarCuenta() {

    let perfil = {
      "username": this.usernameField.value,
      "first_name": this.nombreField.value,
      "last_name": this.apellidoField.value,
      "is_active": this.isActiveField.value,
      "password": this.passwordField.value

    }

    if( this.passwordField.invalid ) {
      delete perfil.password; }

    this.perfilService.updatePerfil(this.cuenta.id, perfil).subscribe(
      (cuenta) => {
        this.cuenta = cuenta
        this.notificacionService.notificacionExitosa("La cuenta fue actualizada exitosamente");
      },
      (err) => this.notificacionService.notificacionErrores(err)
    )

  }

}
