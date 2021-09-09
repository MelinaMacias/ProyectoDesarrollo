import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {


  constructor(private toastService: ToastrService) { }

  notificacionesExitosas(mensajes:Array<string>){
    mensajes.forEach(this.notificacionExitosa);
  }

  notificacionErronea(mensaje: string){

    this.toastService.error(mensaje);

  }

  notificacionExitosa(mensaje:string){

      this.toastService.success(mensaje);

  }

  notificacionErrores(errores:any){

    let errors = Object.keys(errores.error);
    errors.forEach( (campoErroneo) => {
      errores.error[campoErroneo].forEach( (error:any) => {
        this.toastService.error(error, `Error en el campo ${campoErroneo}`)
      })
    });

  }

}
