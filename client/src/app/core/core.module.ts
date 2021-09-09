import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactFormService } from './services/contacto/contact-form.service';
import { MenuService } from './services/menu/menu.service';
import { NoticiaService } from './services/noticia/noticia.service';
import { AuthenticationService } from './services/auth/authentication/authentication.service';
import { PerfilService } from './services/perfil-service/perfil-service.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    MenuService,
    PerfilService,
    NoticiaService,
    ContactFormService,
    AuthenticationService
  ]
})
export class CoreModule { }
