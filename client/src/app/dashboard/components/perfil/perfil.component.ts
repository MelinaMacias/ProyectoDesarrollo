
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PerfilService } from 'src/app/core/services/perfil-service/perfil-service.service';
import { NotificacionesService } from 'src/app/shared/services/notificaciones/notificaciones.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  perfil: any;
  emailField: FormControl;
  nombreField: FormControl;
  apellidoField: FormControl;
  passwordField: FormControl;
  passwordInvalid: boolean = false;

  constructor(
    private notificacionService: NotificacionesService,
    private perfilService: PerfilService) {

    this.nombreField = new FormControl('', [Validators.required]);
    this.apellidoField = new FormControl('', [Validators.required]);
    this.emailField = new FormControl('', [Validators.required]);
    this.passwordField = new FormControl('', [Validators.required, Validators.minLength(4)]);

  }

  ngOnInit(): void {

    this.perfilService.getPerfil(0).subscribe( (perfil: any) => {

      this.perfil = perfil
      this.nombreField.setValue(perfil.first_name);
      this.apellidoField.setValue(perfil.last_name);
      this.emailField.setValue(perfil.email);

    });

  }

  actualizarPerfil() {

    if(this.nombreField.valid &&
      this.apellidoField.valid &&
      this.emailField.valid ) {

      let perfil = {
        "first_name": this.nombreField.value,
        "last_name": this.apellidoField.value,
        "email": this.emailField.value,
        "password": this.passwordField.value
      };

      if( this.passwordField.invalid ) {
        delete perfil.password; }

      this.perfilService.updatePerfil(0, perfil).subscribe(
        (perfil: any) => {

          this.perfil = perfil;
          this.passwordField.setValue("");
          this.notificacionService.notificacionExitosa(
            "El perfil se actualizo exitosamente");

        },
        (err) => this.notificacionService.notificacionErrores(err)
      );

    } else {
      this.notificacionService.notificacionErronea(
        "Revise sus campos uno de ellos es incorrecto"); }

  }

}
