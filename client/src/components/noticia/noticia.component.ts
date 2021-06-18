import { Component } from "@angular/core";
import { Noticia } from "../../models/noticia.model";

@Component({
    selector: 'app-noticia',
    templateUrl: './noticia.component.html'
})

export class NoticiaComponent {
    noticia: Noticia;
}