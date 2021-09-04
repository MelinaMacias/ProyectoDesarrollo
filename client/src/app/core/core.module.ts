import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactFormService } from './services/contacto/contact-form.service';
import { MenuService } from './services/menu/menu.service';
import { NoticiaService } from './services/noticia/noticia.service';
import { AuthenticationService } from './services/auth/authentication/authentication.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    MenuService,
    NoticiaService,
    ContactFormService,
    AuthenticationService
  ]
})
export class CoreModule { }
