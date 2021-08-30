
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ContenedorDashboardComponent } from './components/contenedor-dashboard/contenedor-dashboard.component';
import { GeneralComponent } from './components/general/general.component';
import { NoticiaComponent } from './components/noticia/noticia.component';
import { MensajesContactoComponent } from './components/mensajes-contacto/mensajes-contacto.component';
import { ReservacionesComponent } from './components/reservaciones/reservaciones.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { MenuComponent } from './components/menu/menu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ContenedorDashboardComponent,
    GeneralComponent,
    MenuComponent,
    NoticiaComponent,
    MensajesContactoComponent,
    ReservacionesComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
