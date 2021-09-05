import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Noticia } from 'src/app/core/models/noticia';
import { NoticiaService } from 'src/app/core/services/noticia/noticia.service';
import { NotificacionesService } from 'src/app/shared/services/notificaciones/notificaciones.service';

@Component({
  selector: 'app-update-noticia',
  templateUrl: './update-noticia.component.html',
  styleUrls: ['./update-noticia.component.css']
})
export class UpdateNoticiaComponent implements OnInit {

  titleField: FormControl;
  descriptionField: FormControl;
  imageUrlField: FormControl;
  noticia: Noticia;

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private noticiaService : NoticiaService,
    private notifaciones: NotificacionesService
  ) { 

    this.titleField = new FormControl('', [Validators.required, Validators.minLength(10)])
    this.descriptionField = new FormControl('', [Validators.required, Validators.minLength(20)])
    this.imageUrlField = new FormControl('', [Validators.required])

  }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {

      const id = params.id || null
      this.noticiaService.getNoticia(id)
        .subscribe((noticia : Noticia )=> {

          this.titleField.setValue(noticia.title);
          this.descriptionField.setValue(noticia.description);
          this.imageUrlField.setValue(noticia.urlimage);
          this.noticia = noticia;
        });
  
      });

  }


  editarNoticia(){
  
    this.noticia.title = this.titleField.value;
    this.noticia.description=this.descriptionField.value;
    this.noticia.urlimage = this.imageUrlField.value;
    this.noticiaService.actualizarNoticia(this.noticia.id, this.noticia).subscribe((noticia: any) => {
      this.notifaciones.notificacionExitosa(
        `La noticia ${noticia.title} fue actualizado de forma exitosa `);
    });
  }

}
