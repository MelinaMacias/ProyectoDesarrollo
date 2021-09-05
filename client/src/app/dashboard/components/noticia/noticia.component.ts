import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Noticia } from 'src/app/core/models/noticia';
import { NoticiaService } from 'src/app/core/services/noticia/noticia.service';
import { NotificacionesService } from 'src/app/shared/services/notificaciones/notificaciones.service';

@Component({
  selector: 'dashboard-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css']
})
export class NoticiaComponent implements OnInit {

  noticias : Array<Noticia> = [];

  constructor(private noticiaService: NoticiaService,
    private route: ActivatedRoute,
    private router: Router,
    private notifaciones: NotificacionesService) { }

  ngOnInit(): void {

    this.noticiaService.getAllNews().subscribe( (noticias: Array<Noticia>) => {

      noticias.forEach( (noticia: any) => {
      
        this.noticias.push(noticia);
      
      });

      });

  }

  borrar(noticia: Noticia){
  
    this.noticiaService.borrarNoticia(noticia.id).subscribe( (noticia: any) => {

      document.querySelector(`#noticia-${noticia.id}`).remove();
      this.notifaciones.notificacionExitosa(
        `La noticia ${noticia.title} fue borrado de forma exitosa `);
          
    });
  
  }

}
