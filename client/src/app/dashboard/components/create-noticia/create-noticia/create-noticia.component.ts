import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoticiaService } from 'src/app/core/services/noticia/noticia.service';
import { NotificacionesService } from 'src/app/shared/services/notificaciones/notificaciones.service';

@Component({
  selector: 'app-create-noticia',
  templateUrl: './create-noticia.component.html',
  styleUrls: ['./create-noticia.component.css']
})
export class CreateNoticiaComponent{

  titleField: FormControl;
  descriptionField: FormControl;
  imageUrlField: FormControl;

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private noticiaService : NoticiaService,
    private notifaciones: NotificacionesService ) { 

    this.titleField = new FormControl('', [Validators.required, Validators.minLength(10)]);
    this.descriptionField = new FormControl('', [Validators.required, Validators.minLength(20)]);
    this.imageUrlField = new FormControl('', [Validators.required]);

  }

  nuevaNoticia(){
  
    this.noticiaService.crearNoticia({
      id: 0,
      title: this.titleField.value,
      description: this.descriptionField.value,
      urlimage: this.imageUrlField.value
    
    }).subscribe((noticia: any) => {
      this.notifaciones.notificacionExitosa(
        `El plato ${noticia.title} fue creado de forma exitosa `);
      this.router.navigate(["/dashboard/noticias"])
    },
    (err) => this.notifaciones.notificacionErrores(err)
    );

  }

}

