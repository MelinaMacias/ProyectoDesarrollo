
import { Component, OnInit } from '@angular/core';
import { PerfilService } from 'src/app/core/services/perfil-service/perfil-service.service';
import { GeneralService } from '../../services/general/general.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

  estadisticas: any;
  usuariosStaff: any;
  registroRespuestas: any;

  constructor(
    private perfilService: PerfilService,
    private generalService: GeneralService) { }

  ngOnInit(): void {

    this.generalService.getEstadisticas().subscribe((estadistica) => {

      this.estadisticas = estadistica

    });

    this.perfilService.getPerfiles().subscribe(( usuariosStaff: any ) => {

      this.usuariosStaff = usuariosStaff;

    });

  }

  getRegistros(event: any) {

    let target = event.target;

    this.generalService.getRegistrosRespuestaMensajes(target.value)
    .subscribe(
      (registros: any) => { this.registroRespuestas = registros; }
    )

  }

}
