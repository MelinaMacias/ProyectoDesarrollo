
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

@NgModule({
  declarations: [
    ContenedorDashboardComponent,
    GeneralComponent,
    MenuComponent,
    NoticiaComponent,
    MensajesContactoComponent,
    ReservacionesComponent,
    PerfilComponent,
    ComentariosComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
