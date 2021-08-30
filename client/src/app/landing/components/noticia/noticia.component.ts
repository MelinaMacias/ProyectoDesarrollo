
import { Component, Input, OnInit } from "@angular/core";
import { Noticia } from "src/app/core/models/noticia";
import { NoticiaService } from "src/app/core/services/noticia/noticia.service";

@Component({
    selector: 'app-noticia',
    templateUrl: './noticia.component.html',
    styleUrls: ['./noticia.component.css']
})
export class NoticiaComponent implements OnInit {

  @Input() title:string;
  @Input() subtitle:string;
  @Input() footer:boolean = true;

  noticias: Noticia[];

  constructor(
    private noticiaService:NoticiaService) {

  }

  ngOnInit() {

    this.noticiaService.getAllNews().subscribe( noticiaList => {

      this.noticias = this.footer ? noticiaList.reverse()
        : noticiaList.reverse().slice(0, 2);

    });

    if( !this.title ) {

      this.title = "Todas las noticias";
      this.subtitle = "Encuentre los ultimos boletines y anuncios";

    }

  }

}
