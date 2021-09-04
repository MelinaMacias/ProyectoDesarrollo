
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ContenedorDashboardComponent } from './components/contenedor-dashboard/contenedor-dashboard.component';
import { GeneralComponent } from './components/general/general.component';
import { MensajesContactoComponent } from './components/mensajes-contacto/mensajes-contacto.component';
import { MenuComponent } from './components/menu/menu.component';
import { NoticiaComponent } from './components/noticia/noticia.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ReservacionesComponent } from './components/reservaciones/reservaciones.component';

const routes: Routes = [
  {
    path: "",
    component: ContenedorDashboardComponent,
    children: [
      {
        path: "",
        component: GeneralComponent
      },
      {
        path: "menus",
        component: MenuComponent
      },
      {
        path: "noticias",
        component: NoticiaComponent
      },
      {
        path: "mensajes-contacto",
        component: MensajesContactoComponent
      },
      {
        path: "reservaciones",
        component: ReservacionesComponent
      },
      {
        path: "perfil",
        component: PerfilComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }