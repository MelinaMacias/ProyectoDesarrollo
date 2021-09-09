
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ContenedorDashboardComponent } from './components/contenedor-dashboard/contenedor-dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { GeneralComponent } from './components/general/general.component';
import { NoticiaComponent } from './components/noticia/noticia.component';
import { MensajesContactoComponent } from './components/mensajes-contacto/mensajes-contacto.component';
import { ReservacionesComponent } from './components/reservaciones/reservaciones.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { MenuComponent } from './components/menu/menu.component';
import { ComentariosComponent } from './components/comentarios/comentarios/comentarios.component';
import { UpdateMenuComponent } from './components/update-menu/update-menu/update-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateMenuComponent } from './components/create-menu/create-menu/create-menu.component';
import { CreateNoticiaComponent } from './components/create-noticia/create-noticia/create-noticia.component';
import { UpdateNoticiaComponent } from './components/update-noticia/update-noticia/update-noticia.component';
import { NoticiasBarComponent } from './components/graficos/noticias/noticias-bar/noticias-bar.component';
import { MensajeRespuestaComponent } from './components/mensaje-respuesta/mensaje-respuesta.component';
import { PersonalComponent } from './components/personal/personal/personal.component';
import { CrearPersonalComponent } from './components/personal/crear-personal/crear-personal.component';
import { ActualizarPersonalComponent } from './components/personal/actualizar-personal/actualizar-personal.component';

@NgModule({
  declarations: [
    ContenedorDashboardComponent,
    GeneralComponent,
    MenuComponent,
    NoticiaComponent,
    MensajesContactoComponent,
    ReservacionesComponent,
    PerfilComponent,
    ComentariosComponent,
    UpdateMenuComponent,
    CreateMenuComponent,
    CreateNoticiaComponent,
    UpdateNoticiaComponent,
    NoticiasBarComponent,
    MensajeRespuestaComponent,
    PersonalComponent,
    CrearPersonalComponent,
    ActualizarPersonalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
