import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PerfilService } from 'src/app/core/services/perfil-service/perfil-service.service';
import { NotificacionesService } from 'src/app/shared/services/notificaciones/notificaciones.service';

@Component({
  selector: 'app-crear-personal',
  templateUrl: './crear-personal.component.html',
  styleUrls: ['./crear-personal.component.css']
})
export class CrearPersonalComponent implements OnInit {

  usernameField = new FormControl('', [Validators.required]);
  emailField = new FormControl('', [Validators.required]);
  nombreField = new FormControl('', [Validators.required]);
  apellidoField = new FormControl('', [Validators.required]);
  isActiveField = new FormControl(true);

  constructor(
    private router: Router,
    private notificacionService: NotificacionesService,
    private perfilService: PerfilService) { }

  ngOnInit(): void {

  }

  crearCuenta() {

    let perfil = {
      "username": this.usernameField.value,
      "first_name": this.nombreField.value,
      "last_name": this.apellidoField.value,
      "is_staff": true,
      "email": this.emailField.value,
      "is_active": this.isActiveField.value,
      "password": "1234"
    }

    this.perfilService.crearPerfil(perfil).subscribe(
      (perfil) => {
        this.notificacionService.notificacionExitosa("Se creo la cuenta con exito!");
        this.router.navigate(["/dashboard/personal"]);
      },
      (err) => this.notificacionService.notificacionErrores(err)
    )

  }

}
