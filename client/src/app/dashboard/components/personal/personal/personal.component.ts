
import { Component, OnInit } from '@angular/core';
import { PerfilService } from 'src/app/core/services/perfil-service/perfil-service.service';
import { NotificacionesService } from 'src/app/shared/services/notificaciones/notificaciones.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  perfiles: Array<any> = [];

  constructor(
    private perfilService: PerfilService,
    private notifiacionService: NotificacionesService ) { }

  ngOnInit(): void {

    this.perfilService.getPerfiles().subscribe(
      (perfiles: any) => perfiles.forEach( (perfil: any) => this.perfiles.push(perfil) )
    );

  }

  borrarPerfil(id: number) {

    this.perfilService.deletePerfil(id).subscribe( (res: any) => {

      document.getElementById(`cuenta-${id}`).remove();
      this.notifiacionService.notificacionExitosa("La cuenta ha sido eliminada exitosamente");

    });

  }

}
