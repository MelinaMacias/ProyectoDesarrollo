
import { Component, Input, OnInit } from "@angular/core";
import { NoticiaService } from "src/app/services/noticia.service";
import { Noticia } from "../../models/noticia";

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
    private noticiaService:NoticiaService ) {

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
