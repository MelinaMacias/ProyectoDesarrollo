import { Component } from "@angular/core";
import { Noticia } from "../../models/noticia";

@Component({
    selector: 'app-noticia',
    templateUrl: './noticia.component.html',
    styleUrls: ['./noticia.component.css']
})

export class NoticiaComponent {
    noticia: Noticia;
}